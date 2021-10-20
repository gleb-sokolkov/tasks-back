import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { columnStub } from './stubs/columns.stubs';
import { createColumnDto, findOneParams } from './dto/columns.dto';
import { RestAPI } from 'src/restAPI/restAPI';
import { Column } from './columns.model';

jest.mock('./columns.service');

const stub = columnStub();
const params = () => {
  return {
    column_id: String(stub.id),
    user_id: String(stub.user_id),
  } as findOneParams;
};
const dto = () => {
  return { name: stub.name } as createColumnDto;
};

const column = new RestAPI<Column, findOneParams, createColumnDto>(
  ColumnsController.name,
  params,
  dto,
  ColumnsController,
  ColumnsService,
);

column.test();
