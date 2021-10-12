import { Role } from './roles.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/role.dto';
import { UniqueConstraintError } from 'sequelize';
import { findOneParams } from 'src/users/dto/user.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }

  async getRolesByValue(value: string[]) {
    const role = await this.rolesRepository.findAll({ where: { value } });
    return role;
  }

  async findAll() {
    return this.rolesRepository.findAll();
  }

  async findOne(params: findOneParams) {
    const role = await this.rolesRepository.findOne({
      where: { id: params.user_id },
    });
    if (!role) {
      throw new BadRequestException(
        null,
        `Не удалось найти роль с id=${params.user_id}`,
      );
    } else {
      return role;
    }
  }

  async createRole(dto: createRoleDto) {
    try {
      const role = await this.rolesRepository.create(dto);
      return role;
    } catch (ex) {
      if (ex instanceof UniqueConstraintError) {
        throw new BadRequestException(
          null,
          `Роль: ${dto.value} уже существует`,
        );
      }
    }
  }

  async deleteOne(params: findOneParams) {
    const status = await this.rolesRepository.destroy({
      where: { id: params.user_id },
    });
    if (!status) {
      throw new BadRequestException({
        message: `Не удалось найти роль с id=${params.user_id}`,
      });
    }
  }
}
