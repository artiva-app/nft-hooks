import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { NFTFetchContext } from '../context/NFTFetchContext';
import { onErrorRetry } from '../fetcher/ErrorUtils';
import { EditionPartialFragment } from 'src/graph-queries/editions-graph-types';
import { EditionNFTDataType, transformEditionResponse } from 'src/fetcher/EditionUtils';

export type useEditionType = {
  currencyLoaded: boolean;
  error?: string;
  data?: EditionNFTDataType;
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
  const queryKey = JSON.stringify({ address: address ?? null });
  const res = useSWR<EditionPartialFragment[]>(
    queryKey,
    async (query: string) => {
      const { address } = JSON.parse(query);
      return await fetcher.fetchEdition(address.toLowerCase());
    },
    options
  );

  let data = undefined;
  if (res.data && res.data.length) {
    data = transformEditionResponse(res.data[0]);
  }

  return {
    currencyLoaded: true,
    error: res.error,
    data,
  };
}
