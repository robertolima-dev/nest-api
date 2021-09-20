import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) { }

    async getOneById(id: string): Promise<Profile> {
        try {
            const profile = await this.profileRepository.findOneOrFail(id)
            return profile
        } catch (err) {
            throw err
        }
    }

    async getAll(): Promise<Profile[]> {
        return await this.profileRepository.find({
            relations: ['user']
        })
    }

    async create(profile: any): Promise<Profile[]> {
        try {
            const newProfile = this.profileRepository.create(profile)
            return await this.profileRepository.save(newProfile)
        } catch(err) {
            return err
        }
    }

    async update(id: string, profile: any): Promise<Profile> {
        const profileUpdate = await this.getOneById(id)
        if (!profileUpdate) {
            throw new NotFoundException(`Perfil com id ${id} não encontrado!`)
        }
        profileUpdate.phone = profile.phone
        profileUpdate.gender = profile.gender
        profileUpdate.about = profile.about
        profileUpdate.photo = profile.photo
        profileUpdate.profession = profile.profession
        profileUpdate.birth = profile.birth

        return this.profileRepository.save(profileUpdate)
    }

    async delete(id: string): Promise<Profile> {
        const profileDelete = await this.getOneById(id)
        return await this.profileRepository.remove(profileDelete)
    }
}
