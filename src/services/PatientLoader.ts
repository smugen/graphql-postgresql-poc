import DataLoader from 'dataloader';
import { Inject, Service } from 'typedi';

import { toDaoIdentity } from '../helpers/nodeId';
import { Patient } from '../models';
import SequelizeDatabase from './SequelizeDatabase';

type LoadPatientKey = string;

@Service()
export default class PatientLoader extends DataLoader<
  LoadPatientKey,
  Patient | undefined
> {
  constructor(
    @Inject(() => SequelizeDatabase) { PatientModel }: SequelizeDatabase,
  ) {
    const batchQuery = async (keys: readonly LoadPatientKey[]) => {
      const id = [
        ...new Set(
          keys
            .map(k => toDaoIdentity(k))
            .filter(({ modelName: m }) => m === Patient.name)
            .map(({ _id }) => _id),
        ),
      ];
      const patients = await PatientModel.findAll({ where: { id } });
      return keys.map(key => patients.find(patient => patient.nodeId === key));
    };

    super(batchQuery, { cache: false });
  }
}
