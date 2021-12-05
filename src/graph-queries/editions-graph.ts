import { gql } from 'graphql-request';

export const EDITION_BY_ADDRESS = gql`
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
  query getEdition($address: [String!], $first: Int, $skip: Int) {
    editions(where: $address, first: $first, skip: $skip) {
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
