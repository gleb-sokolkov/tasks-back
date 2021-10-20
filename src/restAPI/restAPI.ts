import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtServiceMock } from 'src/auth/__mocks__/auth.jwt-service';
import { RestAPIRoutes, RestAPIService } from './restAPI.interface';

export class RestAPI<T, P, D> {
  private readonly name: string;
  private readonly params: () => P;
  private readonly dto: () => D;
  private readonly controllerType: Type<RestAPIRoutes<T, P, D>>;
  private readonly serviceType: Type<RestAPIService<T, P, D>>;
  public controller: RestAPIRoutes<T, P, D>;
  public service: RestAPIService<T, P, D>;

  constructor(
    name: string,
    params: () => P,
    dto: () => D,
    controllerType: Type<RestAPIRoutes<T, P, D>>,
    serviceType: Type<RestAPIService<T, P, D>>,
  ) {
    this.name = name;
    this.params = params;
    this.dto = dto;
    this.controllerType = controllerType;
    this.serviceType = serviceType;
  }

  test() {
    describe(this.name, () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [this.controllerType],
          providers: [this.serviceType, JwtServiceMock],
        }).compile();

        this.controller = module.get<RestAPIRoutes<T, P, D>>(
          this.controllerType,
        );
        this.service = module.get<RestAPIService<T, P, D>>(this.serviceType);
        jest.clearAllMocks();
      });

      it('should be defined', () => {
        expect(this.controller).toBeDefined();
      });

      describe('getOne()', () => {
        let item: T;
        let params: P;

        beforeEach(async () => {
          params = this.params();
          item = await this.controller.getOne(params);
        });

        it('should be defined', () => {
          expect(this.controller.getOne).toBeDefined();
        });

        it('should be called with params', () => {
          expect(this.service.findOne).toBeCalledWith(params);
        });

        it('should return item', () => {
          return expect(this.controller.getOne(params)).resolves.toEqual(item);
        });
      });

      describe('getAll()', () => {
        let items: T[];
        let params: P;

        beforeEach(async () => {
          params = this.params();
          items = await this.controller.getAll(params);
        });

        it('should be defined', () => {
          expect(this.controller.getAll).toBeDefined();
        });

        it('should be called with params', () => {
          expect(this.service.findAll).toBeCalledWith(params);
        });

        it('should return item', () => {
          return expect(this.controller.getAll(params)).resolves.toEqual(items);
        });
      });

      describe('createOne()', () => {
        let item: T;
        let params: P;
        let dto: D;

        beforeEach(async () => {
          params = this.params();
          dto = this.dto();
          item = await this.controller.createOne(params, dto);
        });

        it('should be defined', () => {
          expect(this.controller.createOne).toBeDefined();
        });

        it('should be called with params and dto', () => {
          expect(this.service.createOne).toBeCalledWith(params, dto);
        });

        it('should return item', () => {
          return expect(
            this.controller.createOne(params, dto),
          ).resolves.toEqual(item);
        });
      });

      describe('deleteOne()', () => {
        let params: P;

        beforeEach(async () => {
          params = this.params();
          await this.controller.deleteOne(params);
        });

        it('should be defined', () => {
          expect(this.controller.deleteOne).toBeDefined();
        });

        it('should be called with params', () => {
          expect(this.service.deleteOne).toBeCalledWith(params);
        });

        it('should not throw any error', () => {
          return expect(
            this.controller.deleteOne(params),
          ).resolves.not.toThrow();
        });
      });

      describe('deleteAll()', () => {
        let params: P;

        beforeEach(async () => {
          params = this.params();
          await this.controller.deleteAll(params);
        });

        it('should be defined', () => {
          expect(this.controller.deleteAll).toBeDefined();
        });

        it('should be called with params', () => {
          expect(this.service.deleteAll).toBeCalledWith(params);
        });

        it('should not throw any error', () => {
          return expect(
            this.controller.deleteAll(params),
          ).resolves.not.toThrow();
        });
      });

      describe('updateOne()', () => {
        let item: T;
        let params: P;
        let dto: D;

        beforeEach(async () => {
          params = this.params();
          dto = this.dto();
          item = await this.controller.updateOne(params, dto);
        });

        it('should be defined', () => {
          expect(this.controller.updateOne).toBeDefined();
        });

        it('should be called with params and dto', () => {
          expect(this.service.updateOne).toBeCalledWith(params, dto);
        });

        it('should return item', () => {
          return expect(
            this.controller.createOne(params, dto),
          ).resolves.toEqual(item);
        });
      });
    });
  }
}
