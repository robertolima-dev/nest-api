import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOneOrFail({ email: email })
    }

    async getAll(): Promise<User[]> {
        return await this.usersRepository.find({ 
            select: ["id", "email", "isActive"],
            relations: ["profile"],
            // order: {createdAt: "DESC"}
        })
    }

    async getMe(auth: any): Promise<User> {
        console.log(auth)
        const user = await this.usersRepository.findOne(auth.id, {
            select: ["id", "name", "email", "role", "language", "isActive"],
            relations: ["profile"]
        })
        if (!user) {
            throw new NotFoundException(`Usuário não encontrado!`)
        }
        return user
    }

    async getOneById(id: string, auth: any): Promise<User> {
        console.log(auth)
        const user = await this.usersRepository.findOne(id, {
            select: ["id", "name", "email", "role", "language", "isActive"],
        })
        if (!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado!`)
        }
        return user
    }

    async create(user: any): Promise<User[]> {
        const hasEmail = await this.usersRepository.findOne(user.email)
        if (hasEmail) {
            throw new BadRequestException(`Usuário com email ${user.email} já cadastrado!`)
        }
        const newUser = this.usersRepository.create(user)
        return await this.usersRepository.save(newUser)
    }

    async update(id: string, user: any, authUser: any): Promise<User> {
        if(authUser.id !== id) {
            throw new BadGatewayException(`Você não tem permissão para atualizar o usuário do id ${id}`)
        }
        const userUpdate = await this.getOneById(id, authUser)
        if (!userUpdate) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado!`)
        }
        userUpdate.email = user.email
        return this.usersRepository.save(userUpdate)
    }

    async delete(id: string, authUser: any): Promise<User> {
        if (authUser.id !== id) {
            throw new BadGatewayException(`Você não tem permissão para deletar o usuário do id ${id}`)
        }
        const userDelete = await this.getOneById(id, authUser)
        if (!userDelete) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado!`)
        }
        return await this.usersRepository.remove(userDelete)
    }

}