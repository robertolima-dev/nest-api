import { Profile } from 'src/profile/profile.entity';
import { Entity, Column, OneToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Generated } from 'typeorm';
export type UserRoleType = "admin" | "user" | "root"
export type LanguageType = "pt" | "en" | "es"

@Entity()
export class User {
    @PrimaryColumn({ type: "varchar", length: 36 })
    @Generated("uuid")
    id: string;

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "varchar", length: 100, unique: true })
    email: string

    @Column({ type: "varchar", length: 80 })
    password: string;

    @Column({
        type: "enum",
        enum: ["admin", "user", "root"],
        default: "user"
    })
    role: UserRoleType

    @Column({
        type: "enum",
        enum: ["pt", "en", "es"],
        default: 'pt',
        nullable: false
    })
    language: LanguageType

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: any

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: any

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: any

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;

}