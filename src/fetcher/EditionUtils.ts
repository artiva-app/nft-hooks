import { EditionPartialFragment } from '../graph-queries/editions-graph-types';
import { encode } from 'js-base64';

export type EditionNFTDataType = {
  nft: {
    tokenId: string | null;
    contract: {
      address: string;
    };
    metadataURI: string;
    owner: string;
    creator: string;
    name: string;
    description?: string;
    imageURL?: string;
    imageHash: string;
    animationURL?: string;
    animationHash?: string;
    balance?: any;
  };
};

export const editionDataToMetadata = (response: EditionNFTDataType) => {
  return {
    name: response.nft.name,
    description: response.nft.description,
    image: response.nft.imageURL,
    animation_url: response.nft.animationURL,
  };
};

export const transformEditionResponse = (
  data: EditionPartialFragment
): EditionNFTDataType => {
  return {
    nft: {
      contract: {
        address: data.address,
      },
      tokenId: null,
      metadataURI: encode(
        JSON.stringify({
          name: data.name,
          description: data.description,
          image: data.imageURL,
          animation_url: data.animationURL,
        })
      ),
      owner: data.owner,
      creator: data.creator,
      name: data.name,
      description: data.description ?? undefined,
      imageURL: data.imageURL ?? undefined,
      imageHash: data.imageHash,
      animationURL: data.animationURL ?? undefined,
      animationHash: data.animationHash,
      balance: data.balance,
    },
  };
};
