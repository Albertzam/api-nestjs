import { RolesBuilder } from 'nest-access-control';
import { GeneralRole } from './enum.roles.gen';

export enum generalResources {
  ALUMNO = 'ALUMNO',
  CLASE = 'CLASE',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  // ALUMNO ROLES
  .grant(GeneralRole.ALUMNO)
  .createAny([generalResources.ALUMNO])
  .updateAny([generalResources.ALUMNO])
  .deleteAny([generalResources.ALUMNO])
  .readAny([generalResources.ALUMNO])
  //PROFESOR ROL
  .grant(GeneralRole.MAESTRO)
  .extend(GeneralRole.ALUMNO)
  .createAny([generalResources.CLASE])
  .updateAny([generalResources.CLASE])
  .deleteAny([generalResources.CLASE])
  .readAny([generalResources.CLASE]);
