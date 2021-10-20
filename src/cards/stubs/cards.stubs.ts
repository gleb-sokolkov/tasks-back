import { Card } from '../cards.model';

export const cardStub = (): Card => {
  return {
    id: 5,
    name: 'card',
    description: 'sample description',
    column_id: 10,
  } as Card;
};
