import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('createdTask/:id')
  create(@Body() createTaskDto: CreateTaskDto, @Param('id') id:number) {
    return this.taskService.create(createTaskDto, id);
  }

 
  @Patch('updateTaskUser/:idTask/:idUser')
  update(@Param('idTask') idTask:number  ,@Body() updateTaskDto: UpdateTaskDto, @Param('idUser') idUser:number) {
    return this.taskService.update(idTask, updateTaskDto, idUser);
  }

  @Delete('deleteTaskUser/:idTask/:idUser')
  remove(@Param('idTask') idTask: number,@Param('idUser') idUser: number) {
    return this.taskService.remove(idTask,idUser);
  }
}
