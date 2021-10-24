import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RestAPIService } from 'src/restAPI/restAPI.interface';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { Column } from './columns.model';
import { findOneParams, createColumnDto } from './dto/columns.dto';

@Injectable()
export class ColumnsService
  implements RestAPIService<Column, findOneParams, createColumnDto>
{
  constructor(
    @InjectModel(Column) private columnsRepository: typeof Column,
    private usersService: UsersService,
  ) {}

  async findOne(params: findOneParams) {
    const column = await this.columnsRepository.findOne({
      where: {
        id: params.column_id,
        user_id: params.user_id,
      },
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
    const columns = await this.columnsRepository.findAll({
      where: { user_id: params.user_id },
      include: [User],
    });

    if (columns.length === 0) {
      throw new BadRequestException({
        message: `Колонок у пользователя с id=${params.user_id} не найдено`,
      });
    } else {
      return columns;
    }
  }

  async createOne(params: findOneParams, dto: createColumnDto) {
    try {
      const column = await this.columnsRepository.create(
        Object.assign(dto, {
          user_id: parseInt(params.user_id),
        }),
        { include: [User] },
      );
      return column;
    } catch (ex) {
      console.log(ex);
      throw new BadRequestException({
        message: `Пользователя с id=${params.user_id} не существует`,
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
        message: `Колонка с id=${params.column_id} пользователя id=${params.user_id} не найдена`,
      });
    }
  }

  async deleteAll(params: findOneParams) {
    const status = this.columnsRepository.destroy({
      where: { user_id: params.user_id },
    });

    if (!status) {
      throw new BadRequestException({
        message: `Колонок в у пользователя с id=${params.user_id} не найдено`,
      });
    }
  }

  async updateOne(params: findOneParams, dto: createColumnDto) {
    try {
      const result = await this.columnsRepository.update(dto, {
        where: {
          id: params.column_id,
          user_id: params.user_id,
        },
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
