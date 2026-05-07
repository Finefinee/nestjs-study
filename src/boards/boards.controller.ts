import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board.status';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    console.info(`GET /boards/${id}`);
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    console.info('POST /boards');
    return this.boardsService.createBoard(createBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: number): Promise<void> {
    console.info(`DELETE /boards/${id}`);
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    console.info('PATCH /boards/:id');
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAll(): Promise<Board[]> {
    console.info('GET /boards');
    return this.boardsService.getAllBoards();
  }

  // @Get()
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  //
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  //
  // @Delete('/:id')
  // deleteBoardById(@Param('id') id: string): void {
  //   this.boardsService.deleteBoardById(id);
  // }
  //
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): void {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
