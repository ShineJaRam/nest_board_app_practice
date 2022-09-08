import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/createBoardDto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLUC,
      user,
    });

    await this.save(board);

    return board;
  }
}
