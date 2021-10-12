import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Routes } from 'nest-router';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
  },
  {
    path: '/roles',
    module: RolesModule,
  },
  {
    path: '/auth',
    module: AuthModule,
  },
];
