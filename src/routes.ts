import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { Routes } from 'nest-router';
import { ColumnsModule } from './columns/columns.module';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';

export const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [
      {
        path: '/:user_id/columns',
        module: ColumnsModule,
        children: [
          {
            path: '/:column_id/cards',
            module: CardsModule,
          },
        ],
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
