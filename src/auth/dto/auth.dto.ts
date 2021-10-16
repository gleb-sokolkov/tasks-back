import { Role } from 'src/roles/roles.model';

export class Payload {
  id: number;
  roles: Role[];

  constructor(id: number, roles: Role[]) {
    this.id = id;
    this.roles = roles;
  }
}
