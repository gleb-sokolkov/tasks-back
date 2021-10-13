import { UserRole } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { User } from './users/users.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { ColumnsModule } from './columns/columns.module';
import { Column } from './columns/columns.model';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/cards.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Role, UserRole, Column, Card],
      autoLoadModels: true,
    }),
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    RolesModule,
    ColumnsModule,
    CardsModule,
  ],
})
export class AppModule {}
