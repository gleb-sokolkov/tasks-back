import { createUserDto } from 'src/users/dto/user.dto';

const headerStub = (): string =>
  'Authentication=some_token; HttpOnly; Path=/; Max-Age=24h';

const dtoStub = (): createUserDto => {
  return {
    email: 'random@mail.com',
    password: 'K($Rhoasd3YS*(!2',
  };
};

export { headerStub, dtoStub };
