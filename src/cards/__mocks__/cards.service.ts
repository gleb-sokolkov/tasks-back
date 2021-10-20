import { cardStub } from '../stubs/cards.stubs';

export const CardsService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(cardStub()),
  findAll: jest.fn().mockResolvedValue([cardStub()]),
  createOne: jest.fn().mockResolvedValue(cardStub()),
  deleteOne: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteAll: jest.fn().mockImplementation(() => Promise.resolve()),
  updateOne: jest.fn().mockResolvedValue(cardStub()),
});
