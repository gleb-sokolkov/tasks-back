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
    const user = await this.usersService.findOne(params);

    const column = await user.$get('columns', {
      where: { id: params.column_id },
      include: [User],
    });

    if (!column[0]) {
      throw new BadRequestException({
        message: `Не удалось найти колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    } else {
      return column[0];
    }
  }

  async findAll(params: findOneParams) {
    const user = await this.usersService.findOne(params);
    return await user.$get('columns', {
      include: [User],
    });
  }

  async createOne(params: findOneParams, dto: createColumnDto) {
    try {
      const user = await this.usersService.findOne(params);
      return (await user.$create('column', dto, {
        include: [User],
      })) as Column;
    } catch (ex) {
      throw new BadRequestException({
        message: `Пользователя с id=${params.user_id} не существует`,
      });
    }
  }

  async deleteOne(params: findOneParams) {
    const column = await this.findOne(params);
    column.destroy();
  }

  async deleteAll(params: findOneParams) {
    const columns = await this.findAll(params);
    columns.forEach((column) => column.destroy());
  }

  async updateOne(params: findOneParams, dto: createColumnDto) {
    await this.findOne(params);
    try {
      const column = await this.findOne(params);
      for (const [key, value] of Object.entries(dto)) {
        column[key] = value;
      }
      return await column.save();
    } catch (ex) {
      throw new BadRequestException({
        message: `Не удалось обновить колонку с id=${params.column_id} пользователя с id=${params.user_id}`,
      });
    }
  }
}
