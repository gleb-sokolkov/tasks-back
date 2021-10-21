import { roleStub } from '../stubs/roles.stubs';

export const RolesService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(roleStub()),
  findAll: jest.fn().mockResolvedValue([roleStub()]),
  createOne: jest.fn().mockResolvedValue(roleStub()),
});
