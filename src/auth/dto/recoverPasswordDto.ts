import { IsEmail, IsString } from "class-validator";

export class RecoverPasswordDto {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString({ message: 'A nova senha deve ser uma string' })
    newPassword: string;
}