import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        return this.getToken(user)
    }

    async loginGoogle(data) {
        if (data.provider === 'google.com') {
            const user = await this.usersService.findUserByEmail(data.email);
            if (user.id === data.uid) {
                return this.getToken(user)
            } else {
                throw new BadRequestException(`Usuário com email ${data.email} não autorizado!`)
            }
        } else {
            throw new BadRequestException(`Usuário com email ${data.email} não autorizado!`)
        }
    }

    async register(user: any) {
        const saltOrRounds = 10;
        const password = user.password
        const hash = await bcrypt.hash(password, saltOrRounds);
        user.password = hash
        await this.usersService.create(user);
        const userRegister = await this.usersService.findUserByEmail(user.email)
        return this.getToken(userRegister)
    }

    private getToken(user: any) {
        // criacao do payload do JWT
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}