import { renderHook } from '@testing-library/react-hooks';
import { cache } from 'swr';

//import { mockGraphQLQuery } from './setupZoraGQLMock';

import fetchMock from './setupFetchMock';

import { useEdition } from '../src';

describe('useEditionNFT', () => {
  beforeEach(() => {
    fetchMock.reset();
    cache.clear();
  });
  /*
  const EDITION_MOCK = {
    address: '0xc31b85030ebb76fba48a764c11532050eb4bdb54',
    animationHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    animationURL: null,
    description: 'This is computer',
    editionSize: '12',
    id: '0x0',
    imageHash: '0x57a9644861c1e0047cff4e11d49482e806e9a7e266e923ed061d309b70df4647',
    imageURL:
      'https://ipfs.fleek.co/ipfs/bafybeiabq5jvpwtffrga5w4tzpzr6aug4v7hakgjnqzuqcti6m4klsqvvy',
    name: 'Computer',
    owner: '0xa471c9508acf13867282f36cfce5c41d719ab78b',
    purchased: [],
    salePrice: '12',
    totalSupply: '0',
  };
  */

  it('loads an nft edition', async () => {
    console.log('Starting test');
    /*
    const mockOverrides = {
      Edition: () => [EDITION_MOCK],
    };

    mockGraphQLQuery(
      'https://api.thegraph.com/subgraphs/name/neokry/zora-editions',
      mockOverrides,
      {},
      'Editions'
    );
    */

    const { waitFor, result } = renderHook(() =>
      useEdition('0xc31b85030ebb76fba48a764c11532050eb4bdb54')
    );
    await waitFor(() => !!result.current.data, { timeout: 10000 });
    console.log('Loaded');

    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toMatchSnapshot();
  }, 10000);
});
