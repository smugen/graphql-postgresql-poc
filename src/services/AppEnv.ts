import { Service } from 'typedi';

@Service()
export default class AppEnv {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public readonly npm_package_name = process.env.npm_package_name;
  public readonly LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
  public readonly postgresUrl =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    missingEnv('postgresUrl');
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
