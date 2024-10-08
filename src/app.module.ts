import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TaskModule, UsersModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
