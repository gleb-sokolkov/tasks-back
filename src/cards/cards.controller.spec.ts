import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { cardStub } from './stubs/cards.stubs';
import { createCardDto, findOneParams } from './dto/cards.dto';
import { RestAPI } from 'src/restAPI/restAPI';
import { Card } from './cards.model';

jest.mock('./cards.service');

const stub = cardStub();
const params = () => {
  return {
    card_id: String(stub.id),
    column_id: String(stub.column_id),
  } as findOneParams;
};
const dto = () => {
  return {
    name: stub.name,
    description: stub.description,
  } as createCardDto;
};

const card = new RestAPI<Card, findOneParams, createCardDto>(
  CardsController.name,
  params,
  dto,
  CardsController,
  CardsService,
);

card.test();
