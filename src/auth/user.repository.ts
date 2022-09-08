import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async CreateUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { userName, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ userName, password: hasedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log('error', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('existing name');
      }

      throw new InternalServerErrorException();
    }
  }
}
