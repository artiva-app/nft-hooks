import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

// @ts-ignore
import zoraSchema from '../graph-schemas/zora-graph.graphql';
// @ts-ignore
import uniswapSchema from '../graph-schemas/uniswap.graphql';
// @ts-ignore
import ensSchema from '../graph-schemas/ens.graphql';
// @ts-ignore
import editionsSchema from '../graph-schemas/editions-graph.graphql';

import fetchMock from './setupFetchMock';

export type SchemaName = 'Zora' | 'Uniswap' | 'ENS' | 'Editions';

const Schemas: Record<SchemaName, any> = {
  Zora: zoraSchema,
  Uniswap: uniswapSchema,
  ENS: ensSchema,
  Editions: editionsSchema,
};

async function makeQuery(
  mockOverrides: any,
  requestBody: string,
  resolverOverrides: any,
  schema: SchemaName = 'Zora'
) {
  let currentID = 0;
  const mocks = {
    BigInt: () => '12974',
    BigDecimal: () => '13874.2323',
    Bytes: () => 'ByTeSStrInG',
    // Randomly chosen by mock
    //  breaks consistent testing
    Boolean: () => true,
    Int: () => currentID++,
    ReserveAuctionBidType: () => 'Final',
    ReserveAuctionStatus: () => 'Active',
    ID: () => (currentID++).toString(),
    User: () => ({ id: '10' }),
    Currency: () => ({
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      id: '0xFACE',
    }),
    Purchase: () => ({
      id: currentID++,
      address: '0xFACE',
      price: '12974',
      purchasedAtTimestamp: '1',
    }),
    ...mockOverrides,
  };

  const schemaExec = makeExecutableSchema({
    typeDefs: Schemas[schema],
    resolvers: resolverOverrides,
  });
  const schemaWithMocks = addMocksToSchema({
    schema: schemaExec,
    mocks,
    resolvers: resolverOverrides,
  });

  return await graphql(schemaWithMocks, JSON.parse(requestBody).query);
}

export function mockGraphQLQuery(
  url: string,
  mockOverrides: any,
  resolverOverrides: any = () => {},
  schemaName?: SchemaName
) {
  fetchMock.once(
    url,
    async (_: string, req: { body: string }) =>
      await makeQuery(mockOverrides, req.body, resolverOverrides, schemaName)
  );
}
