import { JwtService } from '@nestjs/jwt';

export const JwtServiceMock = {
  provide: JwtService,
  useValue: jest.fn().mockReturnValue(true),
};
