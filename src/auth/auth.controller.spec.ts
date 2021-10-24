import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { createUserDto } from 'src/users/dto/user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { dtoStub, headerStub } from './stubs/auth.stubs';
import * as httpMocks from 'node-mocks-http';

jest.mock('./auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    let header: string;
    let dto: createUserDto;
    let req: Request;

    beforeEach(async () => {
      dto = dtoStub();
      req = httpMocks.createRequest();
      req.res = httpMocks.createResponse();
      header = headerStub();
      await controller.login(dto, req);
    });

    it('should be defined', () => {
      expect(controller.login).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.login).toBeCalledWith(dto);
    });

    it('should not throw any error', () => {
      return expect(controller.login(dto, req)).resolves.not.toThrow();
    });

    it('should return authorization header', () => {
      expect(req.res.get('Set-Cookie')).toBe(header);
    });
  });

  describe('registration()', () => {
    let header: string;
    let dto: createUserDto;
    let req: Request;

    beforeEach(async () => {
      dto = dtoStub();
      req = httpMocks.createRequest();
      req.res = httpMocks.createResponse();
      header = headerStub();
      await controller.registration(dto, req);
    });

    it('should be defined', () => {
      expect(controller.registration).toBeDefined();
    });

    it('should be called with params', () => {
      expect(service.registration).toBeCalledWith(dto);
    });

    it('should not throw any error', () => {
      return expect(controller.registration(dto, req)).resolves.not.toThrow();
    });

    it('should return authorization header', () => {
      expect(req.res.get('Set-Cookie')).toBe(header);
    });
  });
});
