import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  createUser(@Body() createDto:CreateUserDto){
    return this.usersService.create(createDto);
  }

  @Get('findByEmail/:email')
  findByEmail(@Param('email') email:string){
    return this.usersService.findByEmail(email);
  }


  @Get('findTask/:id')
  findTask(@Param('id') id:number){
    return this.usersService.findTaskUser(id)
  }

  @Get('findUserById/:id')
  findUserById(@Param('id') id:number){
    return this.usersService.findById(id);
  }

  @Get('findTaskUniqueUser/:idUser/:idTask')
  findTaskUniqueUser(@Param('idUser') idUser:number, @Param('idTask') idTask:number){
    return this.usersService.findTaskIdUser(idUser,idTask)
  }

  @Patch('updateUser/:id')
  updateUser(@Param('id') id:number, @Body() updateDto: UpdateUserDto){
    return this.usersService.update(id,updateDto);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id:number){
    return this.usersService.remove(id)
  }
}
