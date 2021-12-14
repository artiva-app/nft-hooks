import { gql } from 'graphql-request';

export const EDITION_BY_ADDRESS = gql`
  fragment EditionPartial on Edition {
    id
    address
    owner
    creator
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
    balance
  }
  query getEdition(
    $address: String! = "0xc31b85030ebb76fba48a764c11532050eb4bdb54"
    $first: Int
    $skip: Int
  ) {
    editions(where: { address: $address }, first: $first, skip: $skip) {
      ...EditionPartial
    }
  }
`;
