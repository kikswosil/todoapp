import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SkipAuth } from 'src/skip-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() sighInDto: Record<string, any>) {
    return this.authService.signIn(sighInDto.email, sighInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('user-profile')
  getUserProfile(@Request() req) {
    return req.user;
  }
}
