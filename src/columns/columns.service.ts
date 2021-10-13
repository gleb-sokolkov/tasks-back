import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Column } from './columns.model';
import { findOneParams, createColumnDto } from './dto/columns.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column) private columnsRepository: typeof Column,
    private usersService: UsersService,
  ) {}

  async findOne(params: findOneParams) {
    const column = await this.columnsRepository.findOne({
      where: { id: params.column_id, user_id: params.user_id },
      include: [User],
    });

    if (!column) {
      throw new BadRequestException({
        message: `Не удалось найти колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return column;
    }
  }

  async findAll(params: findOneParams) {
    return this.columnsRepository.findAll({
      where: { user_id: params.user_id },
      include: [User],
    });
  }

  async createOne(params: findOneParams, dto: createColumnDto) {
    try {
      const user = await this.usersService.findOne(params);
      const column = await this.columnsRepository.create(
        {
          name: dto.name,
          user_id: user.id,
        },
        {
          include: [User],
        },
      );
      return column;
    } catch (ex) {
      throw new BadRequestException({
        message: `Ошибка в создании колонки с name=${dto.name}`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const status = await this.columnsRepository.destroy({
      where: {
        id: params.column_id,
        user_id: params.user_id,
      },
    });
    if (!status) {
      throw new BadRequestException({
        message: `Не удалось найти колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    }
  }

  async deleteAll(params: findOneParams) {
    const status = await this.columnsRepository.destroy({
      where: {
        user_id: params.user_id,
      },
    });
    if (!status) {
      throw new BadRequestException({
        message: `Не удалось найти колонки пользователя с id=${params.user_id}`,
      });
    }
  }

  async updateOne(params: findOneParams, dto: createColumnDto) {
    await this.findOne(params);
    try {
      const result = await this.columnsRepository.update(dto, {
        where: { user_id: params.user_id, id: params.column_id },
        returning: true,
      });
      return result[1];
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
