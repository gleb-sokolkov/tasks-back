import { Role } from 'src/roles/roles.model';
import { User } from '../users.model';

export const userStub = (): User => {
  return {
    id: 14,
    email: 'admin@gmail.com',
    password: 'DhgJ#27&!g',
  } as User;
};

export const userWithRoleStub = (): User => {
  return {
    id: 25,
    email: 'admin@gmail.com',
    password: 'DhgJ#27&!g',
    roles: [
      {
        id: 53,
        value: 'USER',
        description: 'Пользователь',
      },
    ] as Role[],
  } as User;
};
