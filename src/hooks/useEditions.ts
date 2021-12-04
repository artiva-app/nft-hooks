import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { NFTFetchContext } from '../context/NFTFetchContext';
import { onErrorRetry } from '../fetcher/ErrorUtils';
import { EditionPartialFragment } from 'src/graph-queries/editions-graph-types';

export type useEditionsType = {
  loading: boolean;
  error?: string;
  data?: EditionPartialFragment[];
};

/**
 * Fetches on-chain NFT auction data for the given curator
 *
 * @param curators
 * @param approved
 * @returns useNFTType hook results include loading, error, and data (ReserveAuctionPartialFragment).
 */
export function useEditions(
  addresses: readonly string[] = [],
  options: SWRConfiguration<EditionPartialFragment[]> = {}
): useEditionsType {
  options.onErrorRetry = onErrorRetry;
  const fetcher = useContext(NFTFetchContext);
  const queryKey = JSON.stringify({ type: 'useEditions', addresses });
  const { data, error } = useSWR<EditionPartialFragment[]>(
    queryKey,
    async (query: string) => {
      const { addresses } = JSON.parse(query);
      return await fetcher.fetchEditions(
        addresses.map((address: string) => address.toLowerCase())
      );
    },
    options
  );

  return {
    loading: !error && !data,
    error,
    data,
  };
}
