import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string,
  ) {
    return this.authService.register(email, password, username);
  }

  // Endpoint para login
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Post('recover-password')
  async recoverPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ) {
    
      return this.authService.recoverPassword(email, newPassword);

  }
      
  

}
