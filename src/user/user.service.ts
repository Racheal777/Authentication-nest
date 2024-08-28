import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database..service';
import { responseData } from 'src/utils/response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly logger: Logger = new Logger(UserService.name);

  async create(createUserDto: SignUpDto) {
    try {
      this.logger.debug('Looking for user if exist');
      const existingUser = await this.databaseService.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        this.logger.debug('User already exists. Authentication failed.');
        throw new NotFoundException(
          'User already exists. Authentication failed.',
        );
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const newUser = await this.databaseService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      return responseData(newUser, 'User created successfully', 201);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findUser(createUserDto: SignInDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (user) {
      const comparePassword = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );
      if (comparePassword) {
        return responseData(user, 'User Logged in successfully', 200);
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    }
    throw new NotFoundException(`No user with this ${createUserDto.email}`);
  }

  async findOne(id: any) {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (user) {
      return responseData(user, 'User data', 200);
    }
    throw new NotFoundException(`No user with this ${id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
