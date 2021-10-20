import { columnStub } from '../stubs/columns.stubs';

export const ColumnsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(columnStub()),
  findAll: jest.fn().mockResolvedValue([columnStub()]),
  createOne: jest.fn().mockResolvedValue(columnStub()),
  deleteOne: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteAll: jest.fn().mockImplementation(() => Promise.resolve()),
  updateOne: jest.fn().mockResolvedValue(columnStub()),
});
