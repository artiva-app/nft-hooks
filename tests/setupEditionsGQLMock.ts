import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

// @ts-ignore
import editions from '../graph-schemas/editions-graph.graphql';
import fetchMock from './setupFetchMock';

export type SchemaName = 'Editions';

const Schemas: Record<SchemaName, any> = {
  Editions: editions,
};

async function makeQuery(
  mockOverrides: any,
  requestBody: string,
  resolverOverrides: any,
  schema: SchemaName = 'Editions'
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
    ID: () => (currentID++).toString(),
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
  fetchMock.once(url, async (_: string, req: { body: string }) => {
    return await makeQuery(mockOverrides, req.body, resolverOverrides, schemaName);
  });
}
