import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentStub } from './stubs/comments.stub';
import { createCommentDto, findOneParams } from './dto/comments.dto';
import { Comment } from './comments.model';
import { RestAPI } from 'src/restAPI/restAPI';

jest.mock('./comments.service');

const stub = commentStub();
const params = () => {
  return {
    column_id: String(stub.id),
    user_id: String(stub.user_id),
  } as findOneParams;
};
const dto = () => {
  return { message: stub.message } as createCommentDto;
};

const comment = new RestAPI<Comment, findOneParams, createCommentDto>(
  CommentsController.name,
  params,
  dto,
  CommentsController,
  CommentsService,
);

comment.test();
