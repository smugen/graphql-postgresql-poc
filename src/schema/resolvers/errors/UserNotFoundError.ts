export default class UserNotFoundError extends Error {
  name = 'UserNotFoundError';

  constructor(id: string) {
    super(`Could not resolve to a User with the id of '${id}'`);
  }
}
