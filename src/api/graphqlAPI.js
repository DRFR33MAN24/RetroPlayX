import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('localhost:5000/graphql');

const getOffersDocument = `
    query getOffers {
  users_connection(first: 10) {
    edges {
      node {
        id
        email
      }
    }
  }
}
    `;
export const offersApi = createApi({
    reducerPath: 'offersApi',
    baseQuery: graphqlRequestBaseQuery({ client }),
    endpoints: builder => ({
        getOffers: builder.query({
            query: variables => ({ document: getOffersDocument }),
        }),
    }),
});

export const { useGetOffersQuery } = offersApi;
