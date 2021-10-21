import { Role } from './roles.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto, findOneParams } from './dto/role.dto';
import { UniqueConstraintError } from 'sequelize';
import { RestAPIService } from 'src/restAPI/restAPI.interface';

@Injectable()
export class RolesService
  implements RestAPIService<Role, findOneParams, createRoleDto>
{
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }

  async getRolesByValue(value: string[]) {
    const role = await this.rolesRepository.findAll({ where: { value } });
    return role;
  }

  async findAll(params: findOneParams) {
    return this.rolesRepository.findAll();
  }

  async findOne(params: findOneParams) {
    const role = await this.rolesRepository.findOne({
      where: { id: params.role_id },
    });
    if (!role) {
      throw new BadRequestException(
        null,
        `Не удалось найти роль с id=${params.role_id}`,
      );
    } else {
      return role;
    }
  }

  async createOne(params: findOneParams, dto: createRoleDto) {
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
      where: { id: params.role_id },
    });
    if (!status) {
      throw new BadRequestException({
        message: `Не удалось найти роль с id=${params.role_id}`,
      });
    }
  }
}
