import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto);
  }

  @UseGuards(IsAuthGuard)
  @Get('current-user')
  getCurrentUser(@User() userId) {
    return this.authService.getCurrentUser(userId);
  }
}
