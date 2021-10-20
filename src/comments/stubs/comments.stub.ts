import { Comment } from '../comments.model';

export const commentStub = (): Comment => {
  return {
    message: 'Test',
    card_id: 10,
    user_id: 2,
    id: 5,
  } as Comment;
};
