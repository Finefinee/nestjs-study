import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Board 단일 조회
   * @param id - Board의 id
   * @exception NotFoundException - Board를 못 찾을 경우
   * @author @Finefinee
   */
  getBoardById(id: string): Board {
    const found: Board | undefined = this.boards.find(
      (board: Board) => board.id === id,
    );
    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return found;
  }

  deleteBoardById(id: string): void {
    const found: Board = this.getBoardById(id);

    this.boards = this.boards.filter((board: Board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): void {
    const board: Board = this.getBoardById(id);
    board.status = status;
  }
}
