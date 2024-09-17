import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma:PrismaService
  ) { }

async register(email: string, password: string, username: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return this.generateToken(user);
}


async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {message: false,messageError: 'Email invalido!', statusCode: HttpStatus.NOT_FOUND}
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {message: false,messageError: 'Senha invalida!', statusCode: HttpStatus.NOT_FOUND}
  }

  return this.generateToken(user);
}

async recoverPassword(email:string, newPassword:string){
   
   const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { message: false, messageError: 'Email inválido!', statusCode: 404 };
  }

  
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Atualizar a senha do usuário
  await this.prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });

  return { message: true, messageInfo: 'Senha atualizada com sucesso!', statusCode: 200 };
}


private generateToken(user: any) {
  const payload = {email: user.email, sub: user.id};
  return {
    message: true,
    access_token:this.jwtService.sign(payload),
    data: user,
  }
}


async validateUser(userId: number) {
  return this.prisma.user.findUnique({
    where: { id: userId },
  });
}

}
