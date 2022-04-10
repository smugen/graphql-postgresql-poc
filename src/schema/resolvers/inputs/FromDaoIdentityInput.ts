import { UUIDResolver } from 'graphql-scalars';
import { Field, InputType } from 'type-graphql';

import { ModelName } from '../../entities/DaoIdentity';

@InputType()
export default class FromDaoIdentityInput {
  @Field(() => ModelName, {
    description: 'The DAO model name',
  })
  modelName!: ModelName;

  @Field(() => UUIDResolver, {
    description: 'The DAO ID',
  })
  _id!: string;
}
