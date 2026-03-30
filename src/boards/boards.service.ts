import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { BoardStatus } from './board.status';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: uuid(),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board | undefined {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string): void {

    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
