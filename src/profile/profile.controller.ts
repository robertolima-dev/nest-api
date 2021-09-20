import { Controller, Get, Request, Post, UseGuards, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() profile: any) {
        return this.profileService.create(profile);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.profileService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getUserById(@Param() id: string) {
        return this.profileService.getOneById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    update(@Param() id: string, @Body() profile: any) {
        return this.profileService.update(id, profile);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param() id: string) {
        return this.profileService.delete(id);
    }
}
