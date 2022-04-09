import assert from 'assert';
import { resolve } from 'path';

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import koaFavicon from 'koa-favicon';
import koaLogger from 'koa-logger';
import { Service } from 'typedi';

import logger from '../logger';
import schemaFactory from '../schema';
import { NodeEnv } from './AppEnv';

declare global {
  interface Error {
    status?: number;
  }
}

@Service()
export default class SubgraphApp {
  private readonly initApp = new Koa();
  private app?: Koa;

  private async graphql() {
    const schema = await schemaFactory();

    const server = new ApolloServer({
      schema,
      plugins: [
        NodeEnv.Development === this.initApp.env
          ? ApolloServerPluginLandingPageGraphQLPlayground()
          : ApolloServerPluginLandingPageDisabled(),
      ],
      // tracing: !!JSON.parse(APOLLO_SERVER_TRACING),
      // context,
    });

    await server.start();
    return server.getMiddleware();
  }

  async getKoa(): Promise<Koa> {
    if (this.app) {
      return this.app;
    }

    const app = this.initApp
      .on('error', (err, ctx) => logger.error('#app error', { err, ctx }))
      .use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          assert(err instanceof Error);
          ctx.status = err.status ??= 500;
          if (err.status >= 500) {
            logger.error('#app error', { err });
          }
          if (NodeEnv.Production === app.env) {
            delete err.stack;
          }
          ctx.body = err;
        }
      })
      .use(koaFavicon(resolve(__dirname, '../../public/favicon.png')))
      .use(koaLogger(str => logger.http(str, { module: 'app' })))
      .use(await this.graphql())
      .use(ctx => ctx.throw(404));

    return (this.app = app);
  }
}
