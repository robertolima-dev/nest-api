import { Controller, Get, Request, Post, UseGuards, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-paramentros.pipe'

@Controller('api/v1/users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getMe(@Request() req: any) {
        return this.userService.getMe(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getUserById(@Param('id', ValidacaoParametrosPipe) id: string, @Request() req: any) {
        return this.userService.getOneById(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    update(@Param('id', ValidacaoParametrosPipe) id: string, @Body() user: any, @Request() req: any) {
        return this.userService.update(id, user, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param('id', ValidacaoParametrosPipe) id: string, @Request() req: any) {
        return this.userService.delete(id, req.user);
    }
}
