import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
// Controllers
import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { ProfileController } from './profile/profile.controller'
import { CourseModule } from './course/course.module';
// configs
import config from '../ormconfig'

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ProfileModule,
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(config), CourseModule,
  ],
  controllers: [
    AppController, 
    UsersController,
    ProfileController
  ],
  providers: [],
})
export class AppModule {}
