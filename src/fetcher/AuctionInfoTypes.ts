import {
  AskPriceFragment,
  BidDataPartialFragment,
  CurrencyShortFragment,
  CurrentReserveBidFragment,
  Maybe,
  NftMediaFragment,
  PreviousReserveBidFragment,
  ReserveAuctionPartialFragment,
} from '../graph-queries/zora-graph-types';
import {
  ChainCurrencyType,
  NFTResultType,
  ReserveAuctionBidsWithCurrency,
} from '../fetcher/FetchResultTypes';
import { AuctionStateInfo } from './AuctionState';
import { OpenseaResponse } from './OpenseaUtils';
import { IndexerTokenWithAuctionFragment } from '../graph-queries/zora-indexer-types';
import { EditionNFTDataType } from './EditionUtils';

export type PricingInfo = {
  currency: CurrencyShortFragment;
  amount: string;
  prettyAmount: string;
  computedValue?: PricingInfoValue;
};

export type BidPricingInfo = {
  pricing: PricingInfo;
};

export type PastReserveBid = Omit<PreviousReserveBidFragment, 'amount'> & BidPricingInfo;

export type CurrentReserveBid = Omit<CurrentReserveBidFragment, 'amount'> &
  BidPricingInfo;

export type PerpetualBid = Omit<BidDataPartialFragment, 'currency' | 'amount'> &
  BidPricingInfo;

export type PerpetualAsk = Pick<AskPriceFragment, 'id' | 'createdAtTimestamp'> &
  BidPricingInfo;

export type PricingInfoValue = {
  inUSD: string;
  inETH: string;
};

export enum AuctionType {
  NONE = 'NONE',
  PERPETUAL = 'PERPETUAL',
  RESERVE = 'RESERVE',
  EDITION = 'EDITION',
}

export type CommonNFTMediaDataType = {
  nft: NFTResultType;
  pricing: {
    perpetual?: {
      bids: BidDataPartialFragment[];
      ask: Maybe<AskPriceFragment>;
    };
    reserve: Maybe<ReserveAuctionPartialFragment>;
  };
};

type ZoraNFTType = Omit<
  NftMediaFragment,
  'currentBids' | 'currentAsk' | 'id' | 'owner' | 'creator'
> & {
  creatorBidSharePercentage: number;
  ownerBidSharePercentage: number;
};
export type ZNFTMediaDataType = CommonNFTMediaDataType & {
  zoraNFT: ZoraNFTType;
};

export type OpenseaNFTMediaDataType = CommonNFTMediaDataType & {
  openseaInfo: OpenseaResponse;
};

export type HighestBidType = {
  pricing: PricingInfo;
  placedBy: string;
  placedAt: string;
};

export type PricingInfoData = {
  status?: AuctionStateInfo;
  edition?: {
    salePrice: PricingInfo;
    totalSupply: number;
    editionSize: number;
  };
  perpetual?: {
    bids: PerpetualBid[];
    ask?: PerpetualAsk;
    highestBid?: HighestBidType;
  };
  reserve?: ReserveAuctionBidsWithCurrency & {
    current: {
      highestBid?: HighestBidType;
      likelyHasEnded: boolean;
      reserveMet: boolean;
    };
    reservePrice?: PricingInfo;
    currentBid?: CurrentReserveBid;
    previousBids: PastReserveBid[];
  };
  auctionType: AuctionType;
};

export type ZNFTDataType = Omit<ZNFTMediaDataType, 'pricing'> & {
  pricing: PricingInfoData;
};

export type OpenseaNFTDataType = Omit<OpenseaNFTMediaDataType, 'pricing'> & {
  pricing: PricingInfoData;
};

export type IndexerDataType = Omit<CommonNFTMediaDataType, 'pricing'> & {
  zoraIndexerResponse: IndexerTokenWithAuctionFragment;
  zoraNFT?: ZoraNFTType;
  pricing: PricingInfoData;
};

export type EditionDataType = Omit<EditionNFTDataType, 'pricing'> & {
  pricing: PricingInfoData;
};

export type NFTDataType =
  | ZNFTDataType
  | OpenseaNFTDataType
  | IndexerDataType
  | EditionDataType;

export type NFTWithPricingType = ZNFTDataType | OpenseaNFTDataType | IndexerDataType;

export type CurrencyLookupType = { [currencyId: string]: ChainCurrencyType };
