import 'source-map-support/register';
import 'reflect-metadata';

import Container from 'typedi';

import logger from './logger';
import AppEnv from './services/AppEnv';
import SubgraphApp from './services/SubgraphApp';

/** this module (.js) run as entry point `process.argv[1]` */
if (require.main === module) {
  main();
}

/** `main` function as application entry point */
async function main() {
  /**
   * define a `Error.prototype.toJSON` to stringify the Error object
   * @see https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
   */
  if (!('toJSON' in Error.prototype)) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Error.prototype, 'toJSON', {
      value: function toJSON() {
        const alt: Record<string, unknown> = {};
        Object.getOwnPropertyNames(this).forEach(key => {
          alt[key] = this[key];
        });
        return alt;
      },
      configurable: true,
      writable: true,
    });
  }

  const env = Container.get(AppEnv);
  const subgraph = await Container.get(SubgraphApp).getKoa();
  const server = subgraph.listen(env.subgraphPort).on('listening', () => {
    const address = server.address();
    logger.info('HTTP Server listening on', { address });
  });
}
