import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function initRoles(app: INestApplication) {
  const r = app.get(RolesService);

  try {
    await r.createRole({
      value: 'USER',
      description: 'Пользователь',
    });
  } catch (ex) {
    console.log(ex.message);
  }
  try {
    await r.createRole({
      value: 'ADMIN',
      description: 'Администратор',
    });
  } catch (ex) {
    console.log(ex.message);
  }

  try {
    const u = app.get(UsersService);
    const admin = await u.createUser({
      email: 'admin@admin.admin',
      password: '12345abc',
    });

    const adminRole = await r.getRoleByValue('ADMIN');
    admin.$add('roles', [adminRole.id]);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (process.env.NODE_ENV === 'dev') {
    await initRoles(app);
  }

  const config = new DocumentBuilder()
    .setTitle('Тестовое задание nestjs')
    .setDescription('Тестовое задание на стажировку Nodejs')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
