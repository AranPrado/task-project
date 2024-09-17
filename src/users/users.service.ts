import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,) { }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log('User found by email:', user); // Adicione este log para verificar o resultado
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassWord = await bcrypt.hash(createUserDto.password, 10)

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassWord
      }
    })
  }

  async findById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    })
  }

  async findTaskUser(idUser: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: idUser }
    })

    if (!user) {
      return { message: false, errorMessage: "Usuario não encontrado" }
    }

    const filterTask = await this.prisma.task.findMany({
      where: { userId: idUser }
    })

    const returnFilter = {
      data: filterTask,
      userInfo: user
    }

    return returnFilter;
  }

  async findTaskIdUser(idUser:number, idTask:number){
    const filterUser = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })

    if(!filterUser){
      return {message: false,errorMessage: "Usuario não encontrado!"}
    }

    const filterTaskUniqueUser = await this.prisma.task.findUnique({
      where:{
        id: idTask,
        userId: idUser
      }
    })

    if(!filterTaskUniqueUser){
      return {message: false,errorMessage: "Tarefa não encontrada!"}
    }

    return {
      message: true,
      data: filterTaskUniqueUser
    }
  }


  async update(userId: number, updateUserDto: UpdateUserDto) {

    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Filtre campos vazios
      const filteredUpdateDto = this.removeEmptyFields(updateUserDto);

      // Atualize o usuário
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: filteredUpdateDto,
      });


      const returnResponse = {
        data: filteredUpdateDto,
        message: true,
        messageSuccess: "Atualizado com sucesso"
      }

      return returnResponse;




    } catch (error) {
      return { message: false, messageError: "Usuario não encontrado", statusCode: HttpStatus.NOT_FOUND }
    }




  }

  async remove(idUser: number) {

    const filterUser = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })

    if(!filterUser){
      return {message: false, errorMessage: 'Usuario não encontrado'}
    } else {
      await this.prisma.task.deleteMany({
        where:{
          userId: idUser
        }
      })

      const deleteUser = await this.prisma.user.delete({
        where: {
          id: idUser
        }
      })

      return {
        message: true,
        messageSuccess: "Usuario excluido com sucesso!",
        data: deleteUser
      }
    }

    

   
    

  }

  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }



}
