import { gql } from 'graphql-request';

export const EDITIONS_BY_ADDRESSES = gql`
  fragment EditionPartial on Edition {
    id
    address
    owner
    name
    description
    totalSupply
    editionSize
    purchased {
      address
      purchasedAtTimestamp
    }
    salePrice
    imageURL
    imageHash
    animationURL
    animationHash
  }
  query getEditions($addresses: [String!], $first: Int, $skip: Int) {
    editions(where: { address_in: $addresses }, first: $first, skip: $skip) {
      id
      address
      owner
      name
      description
      totalSupply
      editionSize
      purchased {
        address
        purchasedAtTimestamp
      }
      salePrice
      imageURL
      imageHash
      animationURL
      animationHash
    }
  }
`;
