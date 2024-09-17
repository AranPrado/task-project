import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }
  async create(createTaskDto: CreateTaskDto, id: number) {

    const user = this.prisma.user.findUnique({
      where: {id}
    })

    if(!user){
      return {message:false, errorMessage: "Usuario não encontrado", statusCode: HttpStatus.NOT_FOUND}
    }

    
      const task = {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        userId: id
      }

      try {

        const createdTask = await this.prisma.task.create({
          data: task
        })
  
        return {message: true, data: task}
  
        
      } catch (error) {
        return {message:false, errorMessage: "Usuario não encontrado", statusCode: HttpStatus.NOT_FOUND}
      }
    

    
    
  }


  async update(idTask: number, updateTaskDto: UpdateTaskDto,idUser:number) {
   
    const filterUser = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })
    
    if(!filterUser){
      return {message: false, errorMessage: 'Usuario não encontrado', statusCode: HttpStatus.NOT_FOUND}
    } 

    const filterTaskUser = await this.prisma.task.findUnique({
      where: {
        id: idTask,
        userId: idUser
      }
    })

    if(!filterTaskUser){
      return {message: false, errorMessage: 'Tarefa não encontrada', statusCode: HttpStatus.NOT_FOUND}
    } 

    const filterUpdateDto = this.removeEmptyFields(updateTaskDto);

    const updateTask = await this.prisma.task.update({
      where:{
        id: idTask,
        userId: idUser
      },
      data: filterUpdateDto
    })

    return {
      message: true,
      messageSuccess: "Tarefa atualizada com sucesso",
      data: filterUpdateDto
    }

    


  }

  async remove(idTask: number, idUser:number) {
    const filterUser = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    })
    
    if(!filterUser){
      return {message: false, errorMessage: 'Usuario não encontrado', statusCode: HttpStatus.NOT_FOUND}
    } 

    const filterTaskUser = await this.prisma.task.findUnique({
      where: {
        id: idTask,
        userId: idUser
      }
    })

    if(!filterTaskUser){
      return {message: false, errorMessage: 'Tarefa não encontrada', statusCode: HttpStatus.NOT_FOUND}
    } 

    const deleteTask = await this.prisma.task.delete({
      where:{
        id: idTask,
        userId: idUser
      }
    })

    return {
      message:true,
      messageSuccess: "Tarefa excluida com sucesso!",
    }
  }

  removeEmptyFields<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    ) as T;
  }
}
