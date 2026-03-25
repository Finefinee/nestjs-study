import { BoardStatus } from './board.status';

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
