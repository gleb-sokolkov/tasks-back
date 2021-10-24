import { Role } from './../roles.model';
export const roleStub = (): Role => {
  return {
    id: 52,
    value: 'ADMIN',
    description: 'Администратор',
  } as Role;
};
