import { createUserDto } from 'src/users/dto/user.dto';

const headerStub = (): string =>
  'Authentication=some_token; HttpOnly; Path=/; Max-Age=24h';

const dtoStub = (): createUserDto => {
  return {
    email: 'nest@mail.com',
    password: 'K($Rhoasd3YS*(!2',
  };
};

const wrongDtoStub = (): createUserDto => {
  return {
    email: 'nest@mail.com',
    password: 'wrong password',
  };
};

export { headerStub, dtoStub, wrongDtoStub };
