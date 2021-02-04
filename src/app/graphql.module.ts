import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { GLOBALS } from './globals';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';

interface Definintion {
  kind: string;
  operation?: string;
}

const uri = GLOBALS.GRAPHQL_ENDPOINT; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // http link
  const http = httpLink.create({
    uri,
  });

  //websocket link
  const ws = new WebSocketLink({
    uri: environment.WEBSOCKET_URL,
    options: {
      reconnect: true,
    },
  });

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `${token}`,
        },
      };
    }
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definintion = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
