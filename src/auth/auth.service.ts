import { Injectable, Logger } from '@nestjs/common';

import { SignInDto, SignUpDto } from '../user/dto/create-user.dto';

import { responseData } from '../utils/response';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  private logger: Logger = new Logger(AuthService.name);

  async signup(createUserDto: SignUpDto) {
    try {
      const user = await this.userService.create(createUserDto);

      return responseData(user.data, 'User created successfully', 201);
    } catch (error) {
      throw error;
    }
  }

  async login(createUserDto: SignInDto) {
    try {
      const user = await this.userService.findUser(createUserDto);
      this.logger.debug('User login');
      if (user.data) {
        console.log('use', user.data)
        this.logger.debug('User login Successfully');

        const payload = { id: user.data.id, email: user.data.email };
        return { access_token: this.jwtService.sign(payload) };
      }
    } catch (error) {
      throw error;
    }
  }
}
