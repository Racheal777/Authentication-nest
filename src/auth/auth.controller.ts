import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './authguard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signup(@Body(ValidationPipe) createUserDto: SignUpDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) createUserDto: SignInDto) {
    return this.authService.login(createUserDto);
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
