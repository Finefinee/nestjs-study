import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: Repository<Board>) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Cant find a board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const createdBoard: Board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(createdBoard);
    return createdBoard;
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.delete(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const board: Board = {
  //     id: uuid(),
  //     title: createBoardDto.title,
  //     description: createBoardDto.description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // /**
  //  * Board 단일 조회
  //  * @param id - Board의 id
  //  * @exception NotFoundException - Board를 못 찾을 경우
  //  * @author @Finefinee
  //  */
  // getBoardById(id: string): Board {
  //   const found: Board | undefined = this.boards.find(
  //     (board: Board) => board.id === id,
  //   );
  //   if (!found) {
  //     throw new NotFoundException(`Can't find board with id ${id}`);
  //   }
  //   return found;
  // }
  //
  // deleteBoardById(id: string): void {
  //   const found: Board = this.getBoardById(id);
  //
  //   this.boards = this.boards.filter((board: Board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): void {
  //   const board: Board = this.getBoardById(id);
  //   board.status = status;
  // }
}
