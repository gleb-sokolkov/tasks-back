import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtServiceMock } from 'src/auth/__mocks__/auth.jwt-service';
import { commentStub } from './stubs/comments.stub';
import {
  findOneParams,
  findOneParamsWithUser,
  paramsAndDto,
} from './dto/comments.dto';
import { Comment } from './comments.model';

jest.mock('./comments.service');

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, JwtServiceMock],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOne()', () => {
    let params: findOneParams;
    let comment: Comment;
    let stub: Comment;

    beforeEach(async () => {
      stub = commentStub();
      params = {
        comment_id: String(stub.id),
        user_id: String(stub.user_id),
        card_id: String(stub.card_id),
      } as findOneParams;
      comment = await controller.getOne(params);
    });

    it('should be defined', () => {
      expect(controller.getOne).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.findOne).toBeCalledWith(params);
    });

    it('should return comment', () => {
      return expect(controller.getOne(params)).resolves.toEqual(comment);
    });
  });

  describe('getAll()', () => {
    let comments: Comment[];
    let stub: Comment;
    let params: findOneParams;

    beforeEach(async () => {
      stub = commentStub();
      params = {
        comment_id: String(stub.id),
        user_id: String(stub.user_id),
        card_id: String(stub.card_id),
      } as findOneParams;
      comments = await controller.getAll(params);
    });

    it('should be defined', () => {
      expect(controller.getAll).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.findAll).toBeCalledWith(params);
    });

    it('should return comments', () => {
      return expect(controller.getAll(params)).resolves.toEqual(comments);
    });
  });

  describe('createOneByAnother()', () => {
    let comment: Comment;
    let stub: Comment;
    let body: paramsAndDto;

    beforeEach(async () => {
      stub = commentStub();
      body = {
        params: {
          comment_id: String(stub.id),
          user_id: String(stub.user_id),
          card_id: String(stub.card_id),
        } as findOneParamsWithUser,
        dto: { message: stub.message },
      };
      comment = await controller.createOneByAnother(body);
    });

    it('should be defined', () => {
      expect(controller.createOneByAnother).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.createOne).toBeCalledWith(body.params, body.dto);
    });

    it('should return comment', () => {
      return expect(controller.createOneByAnother(body)).resolves.toEqual(
        comment,
      );
    });
  });

  describe('deleteOne()', () => {
    let stub: Comment;
    let params: findOneParams;

    beforeEach(async () => {
      stub = commentStub();
      params = {
        comment_id: String(stub.id),
        user_id: String(stub.user_id),
        card_id: String(stub.card_id),
      } as findOneParams;
      await controller.deleteOne(params);
    });

    it('should be defined', () => {
      expect(controller.deleteOne).toBeDefined();
    });

    it('should be called without any params', () => {
      expect(service.deleteOne).toBeCalledWith(params);
    });

    it('should not throw exeptions', () => {
      return expect(controller.deleteOne(params)).resolves.not.toThrow();
    });
  });

  describe('deleteAll()', () => {
    let stub: Comment;
    let params: findOneParams;

    beforeEach(async () => {
      stub = commentStub();
      params = {
        user_id: String(stub.user_id),
        card_id: String(stub.card_id),
      } as findOneParams;
      await controller.deleteAll(params);
    });

    it('should be defined', () => {
      expect(controller.deleteAll).toBeDefined();
    });

    it('should be called without any params', () => {
      expect(service.deleteAll).toBeCalledWith(params);
    });

    it('should not throw exeptions', () => {
      return expect(controller.deleteAll(params)).resolves.not.toThrow();
    });
  });

  describe('updateOne()', () => {
    let stub: Comment;
    let body: paramsAndDto;
    let comment: Comment;

    beforeEach(async () => {
      stub = commentStub();
      body = {
        params: {
          comment_id: String(stub.id),
          user_id: String(stub.user_id),
          card_id: String(stub.card_id),
        } as findOneParamsWithUser,
        dto: { message: stub.message },
      };
      comment = await controller.updateOne(body);
    });

    it('should be defined', () => {
      expect(controller.updateOne).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.updateOne).toBeCalledWith(body.params, body.dto);
    });

    it('should return comment', () => {
      return expect(controller.updateOne(body)).resolves.toEqual(comment);
    });
  });
});
