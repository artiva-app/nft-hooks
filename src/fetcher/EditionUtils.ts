import { EditionPartialFragment } from 'src/graph-queries/editions-graph-types';

export type EditionNFTDataType = {
  nft: {
    contract: {
      address: string;
    };
    owner: {
      address: string;
    };
  };
  pricing: {
    salePrice: any;
    totalSupply: any;
    editionSize: any;
  };
};

export const editionDataToMetadata = (response: EditionPartialFragment) => {
  return {
    name: response.name,
    description: response.description,
    image: response.imageURL,
    animation_url: response.animationURL,
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
      owner: {
        address: data.owner,
      },
    },
    pricing: {
      salePrice: data.salePrice,
      totalSupply: data.totalSupply,
      editionSize: data.editionSize,
    },
  };
};
