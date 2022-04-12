import {
  Args,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Patient } from '../../models';
import PatientService from '../../services/PatientService';
import UserService from '../../services/UserService';
import NodeArgs from './args/NodeArgs';

@Resolver(() => Patient)
@Service()
export default class PatientResolver implements ResolverInterface<Patient> {
  @Inject(() => PatientService)
  private readonly patientService!: PatientService;
  @Inject(() => UserService)
  private readonly userService!: UserService;

  //    ____
  //   / __ \
  //  | |  | |_   _  ___ _ __ _   _
  //  | |  | | | | |/ _ \ '__| | | |
  //  | |__| | |_| |  __/ |  | |_| |
  //   \___\_\\__,_|\___|_|   \__, |
  //                           __/ |
  //                          |___/
  @Query(() => [Patient], {
    description: 'Get all patients',
  })
  patients() {
    return this.patientService.listPatients();
  }

  @Query(() => Patient, {
    description: 'Get a patient by nodeId',
    nullable: true,
  })
  patient(@Args() { id }: NodeArgs) {
    return this.patientService.loadByNodeId(id);
  }

  //   ______ _      _     _
  //  |  ____(_)    | |   | |
  //  | |__   _  ___| | __| |
  //  |  __| | |/ _ \ |/ _` |
  //  | |    | |  __/ | (_| |
  //  |_|    |_|\___|_|\__,_|
  @FieldResolver()
  visitingDoctor(@Root() { visitingDoctorNodeId }: Patient) {
    return visitingDoctorNodeId
      ? this.userService.loadByNodeId(visitingDoctorNodeId)
      : void 0;
  }
}
