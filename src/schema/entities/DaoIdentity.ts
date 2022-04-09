import assert from 'assert';

import { UUIDResolver } from 'graphql-scalars';
import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

import { toDaoIdentity } from '../../helpers/nodeId';
import GraphNode from './GraphNode';

export enum ModelName {
  User = 'User',
}

registerEnumType(ModelName, {
  name: 'ModelName',
  description: 'The DAO model name',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isModelName = (_: any): _ is ModelName =>
  Object.values(ModelName).includes(_);

@Directive(`@key(fields: "id")`)
@ObjectType({ implements: GraphNode })
export default class DaoIdentity extends GraphNode {
  private constructor(private readonly nodeId: string) {
    super();
    const { modelName, _id } = toDaoIdentity(nodeId);
    assert(isModelName(modelName), `Invalid model name: ${modelName}`);

    this.modelName = modelName;
    this._id = _id;
  }

  static from(id: string): DaoIdentity {
    return new DaoIdentity(id);
  }

  @Field(() => ID, {
    description: 'The Node ID',
  })
  get id(): string {
    return this.nodeId;
  }

  @Field(() => ModelName, {
    description: 'The DAO model name',
  })
  readonly modelName: ModelName;

  @Field(() => UUIDResolver, {
    description: 'The DAO ID',
  })
  readonly _id: string;
}
