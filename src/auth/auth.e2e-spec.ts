import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { createUserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { dtoStub, wrongDtoStub } from './stubs/auth.stubs';
import * as request from 'supertest';
import { User } from 'src/users/users.model';

describe('Auth', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userRepository: typeof User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    authService = app.get(AuthService);
    userRepository = app.get('UserRepository');
  });

  beforeEach(async () => {
    await userRepository.destroy({ where: {} });
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    let dto: createUserDto;
    let wrongDto: createUserDto;

    beforeEach(async () => {
      dto = dtoStub();
      wrongDto = wrongDtoStub();
      await authService.registration(dtoStub());
    });

    it('should return jwt', async () => {
      const token = await authService.login(dto);
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(dto)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.headers['set-cookie'].includes(token)).toBeTruthy();
        });
    });

    it('should throw error that the password is wrong', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(wrongDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('registration', () => {
    let dto: createUserDto;
    let wrongDto: createUserDto;

    beforeEach(async () => {
      dto = dtoStub();
      wrongDto = wrongDtoStub();
    });

    it('should return created', () => {
      return request(app.getHttpServer())
        .post('/auth/registration')
        .send(dto)
        .expect(HttpStatus.CREATED);
    });

    it('should throw error that the email exists', async () => {
      await authService.registration(dto);
      return request(app.getHttpServer())
        .post('/auth/registration')
        .send(wrongDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await userRepository.destroy({ where: {} });
    await app.close();
  });
});
