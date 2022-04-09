import { Service } from 'typedi';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
}

@Service()
export default class AppEnv {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly npm_package_name = process.env.npm_package_name;
  readonly LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
  readonly SUBGRAPH_PORT = process.env.SUBGRAPH_PORT;
  readonly postgresUrl =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    missingEnv('postgresUrl');

  readonly subgraphPort?: number;

  constructor() {
    const subgraphPort = parseInt(this.SUBGRAPH_PORT ?? '', 10);
    subgraphPort >= 0 &&
      subgraphPort <= 65535 &&
      (this.subgraphPort = subgraphPort);
  }
}

function requireEnv(key: keyof AppEnv) {
  const envVar = process.env[key];
  if (!envVar || typeof envVar !== 'string') {
    throw new Error(`Missing env ${key} ${envVar}`);
  }
}

function missingEnv(key: keyof AppEnv): never {
  throw requireEnv(key);
}
