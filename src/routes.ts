import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Routes } from 'nest-router';
import { ColumnsModule } from './columns/columns.module';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [
      {
        path: '/:user_id/columns',
        module: ColumnsModule,
      },
    ],
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
