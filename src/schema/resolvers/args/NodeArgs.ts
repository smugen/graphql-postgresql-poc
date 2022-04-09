import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export default class NodeArgs {
  @Field(() => ID, {
    description: 'ID of the object.',
  })
  id!: string;
}
