#!/usr/bin/env bash
npx get-graphql-schema https://api.thegraph.com/subgraphs/name/neokry/zora-editions > graph-schemas/editions-graph.graphql
npx get-graphql-schema https://indexer-prod-mainnet.hasura.app/v1/graphql > graph-schemas/zora-indexer.graphql
npx get-graphql-schema https://api.thegraph.com/subgraphs/name/ensdomains/ens > graph-schemas/ens.graphql
npx get-graphql-schema https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2 > graph-schemas/uniswap.graphql
npx get-graphql-schema https://api.thegraph.com/subgraphs/name/ourzora/zora-v1 > graph-schemas/zora-graph.graphql
