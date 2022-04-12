import { Inject, Service } from 'typedi';

import { Patient } from '../models';
import PatientNotFoundError from '../schema/resolvers/errors/PatientNotFoundError';
import PatientLoader from './PatientLoader';
import SequelizeDatabase from './SequelizeDatabase';

@Service()
export default class PatientService {
  @Inject(() => SequelizeDatabase)
  private readonly db!: SequelizeDatabase;
  @Inject(() => PatientLoader)
  private readonly patientLoader!: PatientLoader;

  listPatients(): Promise<Patient[]> {
    return this.db.PatientModel.findAll();
  }

  async loadByNodeId(nodeId: string): Promise<Patient> {
    const patient = await this.patientLoader.load(nodeId);
    if (!patient) {
      throw new PatientNotFoundError(nodeId);
    }
    return patient;
  }
}
