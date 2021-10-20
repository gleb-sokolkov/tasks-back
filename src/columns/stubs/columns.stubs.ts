import { Column } from '../columns.model';

export const columnStub = (): Column => {
  return {
    id: 14,
    name: 'Column',
    user_id: 32,
  } as Column;
};
