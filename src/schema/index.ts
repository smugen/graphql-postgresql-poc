import { Validator, useContainer } from 'class-validator';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';

import DaoIdentityResolver from './resolvers/DaoIdentityResolver';
import UserResolver from './resolvers/UserResolver';

// https://github.com/typestack/class-validator#using-service-container
useContainer(Container);
Container.set(Validator, new Validator());

export default function schemaFactory() {
  // return buildFederatedSchema({
  return buildSchema({
    resolvers: [DaoIdentityResolver, UserResolver],
    orphanedTypes: [],
    dateScalarMode: 'isoDate',
    container: Container,
  });
}
