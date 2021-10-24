import { createRoleDto, findOneParams } from './dto/role.dto';
import { roleStub } from './stubs/roles.stubs';
import { RestAPI } from 'src/restAPI/restAPI';
import { Role } from './roles.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

jest.mock('./roles.service');

const stub = roleStub();
const params = (): findOneParams => {
  return { role_id: String(stub.id) } as findOneParams;
};
const dto = (): createRoleDto => {
  return { value: stub.value, description: stub.description } as createRoleDto;
};

const role = new RestAPI<Role, findOneParams, createRoleDto>(
  RolesController.name,
  params,
  dto,
  RolesController,
  RolesService,
);

role.test([role.getOne, role.getAll, role.createOne]);
