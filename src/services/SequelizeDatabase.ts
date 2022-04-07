import { Sequelize } from 'sequelize-typescript';
import { Inject, Service } from 'typedi';

import logger from '../logger';
import { Models, models } from '../models';
import AppEnv from './AppEnv';

@Service()
export default class SequelizeDatabase {
  readonly sequelize: Sequelize;
  readonly models: Models;

  readonly UserModel: Models['User'];

  constructor(@Inject(() => AppEnv) env: AppEnv) {
    this.sequelize = new Sequelize(env.postgresUrl, {
      logging: logger.debug.bind(logger),
      dialect: 'postgres',
      dialectOptions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        application_name:
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../package.json').name,
      },

      models,
      define: {
        underscored: true,
        timestamps: true,
        paranoid: true,
      },
    });

    this.models = this.sequelize.models as unknown as Models;

    this.UserModel = this.models.User;
  }
}
