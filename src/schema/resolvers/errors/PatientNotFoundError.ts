export default class PatientNotFoundError extends Error {
  name = 'PatientNotFoundError';

  constructor(id: string) {
    super(`Could not resolve to a Patient with the id of '${id}'`);
  }
}
