export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};






export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};


export type Edition = {
  __typename?: 'Edition';
  id: Scalars['ID'];
  owner: Scalars['String'];
  creator: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  salePrice: Scalars['BigInt'];
  totalSupply?: Maybe<Scalars['BigInt']>;
  editionSize: Scalars['BigInt'];
  purchased: Array<Purchase>;
  balance: Scalars['BigInt'];
  address: Scalars['String'];
  imageURL?: Maybe<Scalars['String']>;
  animationURL?: Maybe<Scalars['String']>;
  imageHash?: Maybe<Scalars['Bytes']>;
  animationHash?: Maybe<Scalars['Bytes']>;
};


export type EditionPurchasedArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Purchase_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Purchase_Filter>;
};

export type Edition_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  creator_not?: Maybe<Scalars['String']>;
  creator_gt?: Maybe<Scalars['String']>;
  creator_lt?: Maybe<Scalars['String']>;
  creator_gte?: Maybe<Scalars['String']>;
  creator_lte?: Maybe<Scalars['String']>;
  creator_in?: Maybe<Array<Scalars['String']>>;
  creator_not_in?: Maybe<Array<Scalars['String']>>;
  creator_contains?: Maybe<Scalars['String']>;
  creator_not_contains?: Maybe<Scalars['String']>;
  creator_starts_with?: Maybe<Scalars['String']>;
  creator_not_starts_with?: Maybe<Scalars['String']>;
  creator_ends_with?: Maybe<Scalars['String']>;
  creator_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_gt?: Maybe<Scalars['String']>;
  description_lt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_not_in?: Maybe<Array<Scalars['String']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_starts_with?: Maybe<Scalars['String']>;
  description_not_starts_with?: Maybe<Scalars['String']>;
  description_ends_with?: Maybe<Scalars['String']>;
  description_not_ends_with?: Maybe<Scalars['String']>;
  salePrice?: Maybe<Scalars['BigInt']>;
  salePrice_not?: Maybe<Scalars['BigInt']>;
  salePrice_gt?: Maybe<Scalars['BigInt']>;
  salePrice_lt?: Maybe<Scalars['BigInt']>;
  salePrice_gte?: Maybe<Scalars['BigInt']>;
  salePrice_lte?: Maybe<Scalars['BigInt']>;
  salePrice_in?: Maybe<Array<Scalars['BigInt']>>;
  salePrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply?: Maybe<Scalars['BigInt']>;
  totalSupply_not?: Maybe<Scalars['BigInt']>;
  totalSupply_gt?: Maybe<Scalars['BigInt']>;
  totalSupply_lt?: Maybe<Scalars['BigInt']>;
  totalSupply_gte?: Maybe<Scalars['BigInt']>;
  totalSupply_lte?: Maybe<Scalars['BigInt']>;
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
  editionSize?: Maybe<Scalars['BigInt']>;
  editionSize_not?: Maybe<Scalars['BigInt']>;
  editionSize_gt?: Maybe<Scalars['BigInt']>;
  editionSize_lt?: Maybe<Scalars['BigInt']>;
  editionSize_gte?: Maybe<Scalars['BigInt']>;
  editionSize_lte?: Maybe<Scalars['BigInt']>;
  editionSize_in?: Maybe<Array<Scalars['BigInt']>>;
  editionSize_not_in?: Maybe<Array<Scalars['BigInt']>>;
  balance?: Maybe<Scalars['BigInt']>;
  balance_not?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  address?: Maybe<Scalars['String']>;
  address_not?: Maybe<Scalars['String']>;
  address_gt?: Maybe<Scalars['String']>;
  address_lt?: Maybe<Scalars['String']>;
  address_gte?: Maybe<Scalars['String']>;
  address_lte?: Maybe<Scalars['String']>;
  address_in?: Maybe<Array<Scalars['String']>>;
  address_not_in?: Maybe<Array<Scalars['String']>>;
  address_contains?: Maybe<Scalars['String']>;
  address_not_contains?: Maybe<Scalars['String']>;
  address_starts_with?: Maybe<Scalars['String']>;
  address_not_starts_with?: Maybe<Scalars['String']>;
  address_ends_with?: Maybe<Scalars['String']>;
  address_not_ends_with?: Maybe<Scalars['String']>;
  imageURL?: Maybe<Scalars['String']>;
  imageURL_not?: Maybe<Scalars['String']>;
  imageURL_gt?: Maybe<Scalars['String']>;
  imageURL_lt?: Maybe<Scalars['String']>;
  imageURL_gte?: Maybe<Scalars['String']>;
  imageURL_lte?: Maybe<Scalars['String']>;
  imageURL_in?: Maybe<Array<Scalars['String']>>;
  imageURL_not_in?: Maybe<Array<Scalars['String']>>;
  imageURL_contains?: Maybe<Scalars['String']>;
  imageURL_not_contains?: Maybe<Scalars['String']>;
  imageURL_starts_with?: Maybe<Scalars['String']>;
  imageURL_not_starts_with?: Maybe<Scalars['String']>;
  imageURL_ends_with?: Maybe<Scalars['String']>;
  imageURL_not_ends_with?: Maybe<Scalars['String']>;
  animationURL?: Maybe<Scalars['String']>;
  animationURL_not?: Maybe<Scalars['String']>;
  animationURL_gt?: Maybe<Scalars['String']>;
  animationURL_lt?: Maybe<Scalars['String']>;
  animationURL_gte?: Maybe<Scalars['String']>;
  animationURL_lte?: Maybe<Scalars['String']>;
  animationURL_in?: Maybe<Array<Scalars['String']>>;
  animationURL_not_in?: Maybe<Array<Scalars['String']>>;
  animationURL_contains?: Maybe<Scalars['String']>;
  animationURL_not_contains?: Maybe<Scalars['String']>;
  animationURL_starts_with?: Maybe<Scalars['String']>;
  animationURL_not_starts_with?: Maybe<Scalars['String']>;
  animationURL_ends_with?: Maybe<Scalars['String']>;
  animationURL_not_ends_with?: Maybe<Scalars['String']>;
  imageHash?: Maybe<Scalars['Bytes']>;
  imageHash_not?: Maybe<Scalars['Bytes']>;
  imageHash_in?: Maybe<Array<Scalars['Bytes']>>;
  imageHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
  imageHash_contains?: Maybe<Scalars['Bytes']>;
  imageHash_not_contains?: Maybe<Scalars['Bytes']>;
  animationHash?: Maybe<Scalars['Bytes']>;
  animationHash_not?: Maybe<Scalars['Bytes']>;
  animationHash_in?: Maybe<Array<Scalars['Bytes']>>;
  animationHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
  animationHash_contains?: Maybe<Scalars['Bytes']>;
  animationHash_not_contains?: Maybe<Scalars['Bytes']>;
};

export enum Edition_OrderBy {
  Id = 'id',
  Owner = 'owner',
  Creator = 'creator',
  Name = 'name',
  Description = 'description',
  SalePrice = 'salePrice',
  TotalSupply = 'totalSupply',
  EditionSize = 'editionSize',
  Purchased = 'purchased',
  Balance = 'balance',
  Address = 'address',
  ImageUrl = 'imageURL',
  AnimationUrl = 'animationURL',
  ImageHash = 'imageHash',
  AnimationHash = 'animationHash'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['ID'];
  address: Scalars['String'];
  price?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp: Scalars['BigInt'];
  edition: Edition;
};

export type Purchase_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  address?: Maybe<Scalars['String']>;
  address_not?: Maybe<Scalars['String']>;
  address_gt?: Maybe<Scalars['String']>;
  address_lt?: Maybe<Scalars['String']>;
  address_gte?: Maybe<Scalars['String']>;
  address_lte?: Maybe<Scalars['String']>;
  address_in?: Maybe<Array<Scalars['String']>>;
  address_not_in?: Maybe<Array<Scalars['String']>>;
  address_contains?: Maybe<Scalars['String']>;
  address_not_contains?: Maybe<Scalars['String']>;
  address_starts_with?: Maybe<Scalars['String']>;
  address_not_starts_with?: Maybe<Scalars['String']>;
  address_ends_with?: Maybe<Scalars['String']>;
  address_not_ends_with?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  purchasedAtTimestamp?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_not?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_gt?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_lt?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_gte?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_lte?: Maybe<Scalars['BigInt']>;
  purchasedAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  purchasedAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  edition?: Maybe<Scalars['String']>;
  edition_not?: Maybe<Scalars['String']>;
  edition_gt?: Maybe<Scalars['String']>;
  edition_lt?: Maybe<Scalars['String']>;
  edition_gte?: Maybe<Scalars['String']>;
  edition_lte?: Maybe<Scalars['String']>;
  edition_in?: Maybe<Array<Scalars['String']>>;
  edition_not_in?: Maybe<Array<Scalars['String']>>;
  edition_contains?: Maybe<Scalars['String']>;
  edition_not_contains?: Maybe<Scalars['String']>;
  edition_starts_with?: Maybe<Scalars['String']>;
  edition_not_starts_with?: Maybe<Scalars['String']>;
  edition_ends_with?: Maybe<Scalars['String']>;
  edition_not_ends_with?: Maybe<Scalars['String']>;
};

export enum Purchase_OrderBy {
  Id = 'id',
  Address = 'address',
  Price = 'price',
  PurchasedAtTimestamp = 'purchasedAtTimestamp',
  Edition = 'edition'
}

export type Query = {
  __typename?: 'Query';
  edition?: Maybe<Edition>;
  editions: Array<Edition>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryEditionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEditionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Edition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Edition_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPurchaseArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPurchasesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Purchase_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Purchase_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  edition?: Maybe<Edition>;
  editions: Array<Edition>;
  purchase?: Maybe<Purchase>;
  purchases: Array<Purchase>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionEditionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEditionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Edition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Edition_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPurchaseArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPurchasesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Purchase_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Purchase_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type EditionPartialFragment = (
  { __typename?: 'Edition' }
  & Pick<Edition, 'id' | 'address' | 'owner' | 'creator' | 'name' | 'description' | 'totalSupply' | 'editionSize' | 'salePrice' | 'imageURL' | 'imageHash' | 'animationURL' | 'animationHash' | 'balance'>
  & { purchased: Array<(
    { __typename?: 'Purchase' }
    & Pick<Purchase, 'address' | 'purchasedAtTimestamp'>
  )> }
);

export type GetEditionQueryVariables = Exact<{
  address?: Scalars['String'];
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type GetEditionQuery = (
  { __typename?: 'Query' }
  & { editions: Array<(
    { __typename?: 'Edition' }
    & EditionPartialFragment
  )> }
);
