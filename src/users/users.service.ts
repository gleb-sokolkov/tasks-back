import { Role } from './../roles/roles.model';
import { RolesService } from './../roles/roles.service';
import { createUserDto, findOneParams, updateUserDto } from './dto/user.dto';
import { User } from './users.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: createUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getRoleByValue('USER');
      await user.$set('role', [role.id]);
      return user;
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new BadRequestException(
          null,
          `Пользователь с почтой ${dto.email} уже существует`,
        );
      }
    }
  }

  async findAll() {
    return this.userRepository.findAll({ include: [Role] });
  }

  async findOne(params: findOneParams) {
    const user = await this.userRepository.findOne({
      where: { id: params.id },
      include: [Role],
    });
    if (!user) {
      throw new BadRequestException(
        null,
        `Не удалось найти пользователя с id=${params.id}`,
      );
    } else {
      return user;
    }
  }

  async updateOne(params: findOneParams, dto: updateUserDto) {
    const user = await this.findOne(params);
    if (!user) {
      throw new BadRequestException(
        null,
        `Не удалось найти пользователя с id=${params.id}`,
      );
    }
    try {
      const result = await this.userRepository.update(
        { email: dto.email, password: dto.password },
        { where: { id: params.id }, returning: true },
      );
      return result[1];
    } catch (ex) {
      if (ex instanceof UniqueConstraintError) {
        throw new BadRequestException(
          null,
          `Пользователь с почтой ${dto.email} уже существует`,
        );
      }
    }
  }

  async deleteAll() {
    this.userRepository.destroy({ where: {} });
  }

  async deleteOne(params: findOneParams) {
    const status = await this.userRepository.destroy({
      where: { id: params.id },
    });
    if (!status) {
      throw new BadRequestException(
        null,
        `Не удалось найти пользователя с id=${params.id}`,
      );
    }
  }
}
