import { Role } from './../roles/roles.model';
import { RolesService } from './../roles/roles.service';
import { createUserDto, findOneParams, changeRolesDto } from './dto/user.dto';
import { User } from './users.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { RestAPIService } from 'src/restAPI/restAPI.interface';

@Injectable()
export class UsersService
  implements RestAPIService<User, findOneParams, createUserDto>
{
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createOne(params: findOneParams, dto: createUserDto) {
    dto.password = bcrypt.hashSync(
      dto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getRoleByValue('USER');
      await user.$set('roles', [role?.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException({
          message: `Пользователь с почтой ${dto.email} уже существует`,
        });
      }
    }
  }

  async findAll(params: findOneParams) {
    return this.userRepository.findAll({ include: [Role] });
  }

  async findOne(params: findOneParams) {
    const user = await this.userRepository.findOne({
      where: { id: params.user_id },
      include: [Role],
    });
    if (!user) {
      throw new BadRequestException({
        message: `Не удалось найти пользователя с id=${params.user_id}`,
      });
    } else {
      return user;
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: [Role],
    });
    if (!user) {
      throw new BadRequestException({
        message: `Пользователя с почтой ${email} не существует`,
      });
    } else {
      return user;
    }
  }

  async updateOne(params: findOneParams, dto: createUserDto) {
    const user = await this.findOne(params);
    if (!user) {
      throw new BadRequestException({
        message: `Не удалось найти пользователя с id=${params.user_id}`,
      });
    }
    try {
      const result = await this.userRepository.update(
        { email: dto.email, password: dto.password },
        { where: { id: params.user_id }, returning: true },
      );
      return result[1][0];
    } catch (ex) {
      if (ex instanceof UniqueConstraintError) {
        throw new BadRequestException({
          message: `Пользователь с почтой ${dto.email} уже существует`,
        });
      }
    }
  }

  async changeRoles(params: findOneParams, dto: changeRolesDto) {
    const findedRoles = await this.rolesService.getRolesByValue(dto.roles);
    if (findedRoles.length === 0) {
      throw new BadRequestException({
        message: `Права ${dto.roles} не найдены`,
      });
    }
    const roles_id = findedRoles.map((r) => r.id);
    const user = await this.findOne(params);
    await user.$set('roles', roles_id);
    user.roles = findedRoles;

    return user;
  }

  async deleteAll(params: findOneParams) {
    await this.userRepository.destroy({ where: {} });
  }

  async deleteOne(params: findOneParams) {
    const status = await this.userRepository.destroy({
      where: { id: params.user_id },
    });
    if (!status) {
      throw new BadRequestException({
        message: `Не удалось найти пользователя с id=${params.user_id}`,
      });
    }
  }
}
