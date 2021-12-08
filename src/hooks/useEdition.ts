import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { NFTFetchContext } from '../context/NFTFetchContext';
import { onErrorRetry } from '../fetcher/ErrorUtils';
import { EditionPartialFragment } from '../graph-queries/editions-graph-types';
import { transformEditionResponse } from '../fetcher/EditionUtils';
import {
  AuctionType,
  EditionDataType,
  PricingInfoData,
} from '../fetcher/AuctionInfoTypes';
import { transformEditionsCurrency } from '../fetcher/TransformFetchResults';

export type useEditionType = {
  currencyLoaded: boolean;
  error?: string;
  data?: EditionDataType;
};

/**
 * Fetches on-chain NFT auction data for the given curator
 *
 * @param curators
 * @param approved
 * @returns useNFTType hook results include loading, error, and data (ReserveAuctionPartialFragment).
 */
export function useEdition(
  address: string | undefined,
  options: SWRConfiguration<EditionPartialFragment[]> = {}
): useEditionType {
  options.onErrorRetry = onErrorRetry;
  const fetcher = useContext(NFTFetchContext);
  const { refreshInterval } = options || {};

  const res = useSWR<EditionPartialFragment[]>(
    address ? ['fetchEdition', address.toLowerCase()] : null,
    (_, address) => fetcher.fetchEdition(address),
    { refreshInterval, dedupingInterval: 0 }
  );

  console.log('Res', res.error);

  let data = undefined;
  if (res.data && res.data.length) {
    const pricing: PricingInfoData = {
      edition: {
        salePrice: transformEditionsCurrency(res.data[0].salePrice ?? 0),
        totalSupply: res.data[0].totalSupply,
        editionSize: res.data[0].editionSize,
      },
      auctionType: AuctionType.EDITION,
    };

    data = transformEditionResponse(res.data[0]);
    data = {
      ...data,
      pricing,
    };
  }

  return {
    currencyLoaded: true,
    error: res.error,
    data,
  };
}
