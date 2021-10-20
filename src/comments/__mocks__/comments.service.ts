import { commentStub } from '../stubs/comments.stub';

export const CommentsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(commentStub()),
  findAll: jest.fn().mockResolvedValue([commentStub()]),
  createOne: jest.fn().mockResolvedValue(commentStub()),
  deleteOne: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteAll: jest.fn().mockImplementation(() => Promise.resolve()),
  updateOne: jest.fn().mockResolvedValue(commentStub()),
});
