import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller('api/v1')
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/login-google')
  async loginGoogle(@Body() req: any) {
    return this.authService.loginGoogle(req);
  }

  @Post('auth/register')
  async register(@Body() req: any) {
    return this.authService.register(req);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('user/me')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }

}