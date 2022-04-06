import { Sequelize } from 'sequelize-typescript';
import { Inject, Service } from 'typedi';

import logger from '../logger';
import AppEnv from './AppEnv';

@Service()
export default class SequelizeDatabase {
  public readonly sequelize: Sequelize;

  constructor(@Inject(() => AppEnv) readonly env: AppEnv) {
    this.sequelize = new Sequelize(env.postgresUrl, {
      logging: logger.debug.bind(logger),
    });
  }
}
