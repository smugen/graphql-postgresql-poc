import { UUIDResolver } from 'graphql-scalars';
import { Directive, Field, ID, ObjectType } from 'type-graphql';

import { toDaoIdentity } from '../../helpers/nodeId';
import GraphNode from './GraphNode';

@Directive(`@key(fields: "id")`)
@ObjectType({ implements: GraphNode })
export default class DaoIdentity extends GraphNode {
  private constructor(private readonly nodeId: string) {
    super();
    const { modelName, _id } = toDaoIdentity(nodeId);
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

  @Field({
    description: 'The DAO model name',
  })
  readonly modelName: string;

  @Field(() => UUIDResolver, {
    description: 'The DAO ID',
  })
  readonly _id: string;
}
