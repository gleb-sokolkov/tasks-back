import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userStub, userWithRoleStub } from './stubs/users.stubs';
import { changeRolesDto, createUserDto, findOneParams } from './dto/user.dto';
import { RestAPI } from 'src/restAPI/restAPI';
import { User } from './users.model';

jest.mock('./users.service');

const stub = userStub();
const stubWithRoles = userWithRoleStub();
const params = () => {
  return { user_id: String(stub.id) } as findOneParams;
};
const dto = () => {
  return { email: stub.email, password: stub.password } as createUserDto;
};

const user = new RestAPI<User, findOneParams, createUserDto>(
  UsersController.name,
  params,
  dto,
  UsersController,
  UsersService,
);

user.test();

describe('patchRoles()', () => {
  let item: User;
  let tparams: findOneParams;
  let dto: changeRolesDto;
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    tparams = params();
    dto = {
      roles: stubWithRoles.roles.map((item) => item.value),
    } as changeRolesDto;
    controller = user.controller as UsersController;
    service = user.service as UsersService;
    item = await controller.patchRoles(dto, tparams);
  });

  it('should be defined', () => {
    expect(controller.patchRoles).toBeDefined();
  });

  it('should be called with params and dto', () => {
    expect(service.changeRoles).toBeCalledWith(tparams, dto);
  });

  it('should return item', () => {
    return expect(controller.patchRoles(dto, tparams)).resolves.toEqual(item);
  });
});
