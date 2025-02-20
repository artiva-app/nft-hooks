import { getAddress } from '@ethersproject/address';

import { ZORA_MEDIA_CONTRACT_BY_NETWORK } from '../constants/addresses';
import { IndexerTokenWithAuctionFragment } from '../graph-queries/zora-indexer-types';
import { FetchGroupTypes, NFTResultType } from './FetchResultTypes';
import { MediaFetchAgent } from './MediaFetchAgent';
import { openseaDataToMetadata } from './OpenseaUtils';
import { addAuctionInformation } from './TransformFetchResults';
import {
  FetchZoraIndexerItemType,
  FetchZoraIndexerListCollectionType,
} from './ZoraIndexerTypes';

/**
 * This removes undefined values to sanitize
 * data objects to work with nextJS server-side
 * page props.
 *
 * @param json Object to sanitize for JSON fields
 * @returns JSON-safe object
 */
export function prepareJson<T>(json: T): T {
  return JSON.parse(JSON.stringify(json));
}

type fetchNFTDataType = {
  tokenId: string;
  contractAddress?: string;
  fetchAgent: MediaFetchAgent;
  prepareDataJSON?: boolean;
};

/**
 * Async function to fetch auction information and metadata for any
 * NFT or zNFT. Mirrors behavior of useNFT hook but for server-side rendering.
 * Fetches all metadata and auction information server-side. Will be re-validated client-side.
 * Can pass return value directly into `initialData` for useNFT hook.
 *
 * @param tokenId: Token ID to fetch
 * @param contractAddress: Contract address to fetch token from
 * @param fetchAgent: MediaFetchAgent instance
 * @param prepareDataJSON: Sanitizes undefined fields to allow data to work with next.js
 * @returns object with nft and metadata fields, any issues throw an RequestError
 */
export const fetchNFTData = async ({
  tokenId,
  contractAddress,
  fetchAgent,
  prepareDataJSON = true,
}: fetchNFTDataType) => {
  if (
    contractAddress &&
    contractAddress !== ZORA_MEDIA_CONTRACT_BY_NETWORK[fetchAgent.networkId]
  ) {
    const auctionData = await fetchAgent.loadAuctionInfo(contractAddress, tokenId);
    const nft = await fetchAgent.loadNFTData(
      contractAddress,
      tokenId,
      fetchAgent.networkId,
      auctionData
    );
    const metadata = openseaDataToMetadata(nft);
    const response = {
      nft,
      metadata,
    };
    if (prepareDataJSON) {
      return prepareJson(response);
    }
    return response;
  } else {
    const nft = await fetchAgent.loadZNFTData(tokenId);
    const result = nft.nft as NFTResultType;
    const metadata = await fetchAgent.fetchIPFSMetadata(result.metadataURI);
    const response = {
      nft,
      metadata,
    };
    if (prepareDataJSON) {
      return prepareJson(response);
    }
    return response;
  }
};

type fetchZNFTGroupDataType = {
  ids: string[];
  type: FetchGroupTypes;
  fetchAgent: MediaFetchAgent;
  prepareDataJSON?: boolean;
};

/**
 * Server-side initial data hook for zNFTGroup data hook
 *
 * @param ids list of ids (addresses for creator or owner, znft id for NFT)
 * @param type type of 'id' or 'creator' or 'owner' to determine what type of data to fetch
 * @returns NFTDataType
 */
export const fetchZNFTGroupData = async ({
  ids,
  type,
  fetchAgent,
  prepareDataJSON = true,
}: fetchZNFTGroupDataType) => {
  const nftGroup = await fetchAgent.fetchZNFTGroupData(ids, type);
  const response = nftGroup.map((media) => ({
    ...media,
    pricing: addAuctionInformation(media.pricing, undefined, fetchAgent.networkId),
  }));
  if (prepareDataJSON) {
    return prepareJson(response);
  }
  return response;
};

const transformServerSideIndexerDataList = async (
  fetchAgent: MediaFetchAgent,
  response: IndexerTokenWithAuctionFragment[]
) => {
  const auctionInfos = await fetchAgent.loadAuctionInfos(
    response.map((element) => `${element.address.toLowerCase()}-${element.tokenId}`)
  );
  return response.map((tokenData) => {
    return {
      nft: {
        tokenData,
        auctionData: auctionInfos
          .map((auction) => (auction instanceof Error ? undefined : auction))
          .find(
            (auction) =>
              auction?.tokenContract.toLowerCase() === tokenData.address.toLowerCase() &&
              auction?.tokenId === tokenData.tokenId.toString()
          ),
      },
    };
  });
};

/**
 * Server-side initial data hook for zora nft indexer response data
 *
 * @param fetchAgent FetchAgent class
 * @param listOptions Options of what objects to list (limited to contract address at the moment)
 *    has limit and offset fields
 * @param prepareDataJson prepare data for vercel static prop passing by cleaning up invalid JSON objects
 */
export const fetchZoraIndexerList = async (
  fetchAgent: MediaFetchAgent,
  listOptions: FetchZoraIndexerListCollectionType,
  prepareDataJson: boolean = true
) => {
  const response = await fetchAgent.fetchZoraIndexerGroupData(listOptions);
  const result = await transformServerSideIndexerDataList(fetchAgent, response);

  if (prepareDataJson) {
    return prepareJson(result);
  }
  return result;
};

export const getIndexerServerTokenInfo = ({
  nft: { tokenData },
}: {
  nft: { tokenData: IndexerTokenWithAuctionFragment };
}) => ({
  tokenId: tokenData.tokenId.toString(),
  tokenContract: tokenData.address,
  metadata: tokenData.metadata?.json,
  image: tokenData.metadata?.json?.image_url
    ? tokenData.metadata.json.image_url
    : tokenData.media
    ? tokenData.media.contentURI
    : null,
});

/**
 * Server-side initial data hook for zora nft indexer response data
 *
 * @param fetchAgent FetchAgent class
 * @param listOptions Options of what objects to list (limited to contract address at the moment)
 *    has limit and offset fields
 * @param prepareDataJson prepare data for vercel static prop passing by cleaning up invalid JSON objects
 */
export const fetchZoraIndexerItem = async (
  fetchAgent: MediaFetchAgent,
  listOptions: FetchZoraIndexerItemType,
  prepareDataJson: boolean = true
) => {
  const response = await fetchAgent.fetchZoraNFTIndexerNFTs([
    `${getAddress(listOptions.collectionAddress)}-${listOptions.tokenId}`,
  ]);
  const result = await transformServerSideIndexerDataList(fetchAgent, response);

  if (prepareDataJson) {
    return prepareJson(result[0]);
  }
  return result[0];
};

/**
 * Server-side initial data hook for zora nft indexer response data
 *
 * @param fetchAgent FetchAgent class
 * @param listOptions Options of what objects to list (limited to contract address at the moment)
 *    has limit and offset fields
 * @param prepareDataJson prepare data for vercel static prop passing by cleaning up invalid JSON objects
 */
export const fetchUserOwnedNFTs = async (
  fetchAgent: MediaFetchAgent,
  {
    collectionAddresses,
    userAddress,
    offset,
    limit,
  }: {
    collectionAddresses?: string[];
    userAddress: string;
    offset?: number;
    limit?: number;
  },
  prepareDataJson: boolean = false
) => {
  const response = await fetchAgent.fetchZoraIndexerUserOwnedNFTs({
    collectionAddresses,
    userAddress,
    limit,
    offset,
  });
  const result = await transformServerSideIndexerDataList(fetchAgent, response);

  if (prepareDataJson) {
    return prepareJson(result);
  }
  return result;
};
