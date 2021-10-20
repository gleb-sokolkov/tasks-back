import { userStub, userWithRoleStub } from '../stubs/users.stubs';

export const UsersService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  createOne: jest.fn().mockResolvedValue(userStub()),
  deleteOne: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteAll: jest.fn().mockImplementation(() => Promise.resolve()),
  updateOne: jest.fn().mockResolvedValue(userStub()),
  changeRoles: jest.fn().mockResolvedValue(userWithRoleStub()),
});
