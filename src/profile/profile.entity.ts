import { User } from 'src/users/user.entity';
import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, Generated, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
export type UserGenderType = "m" | "f" | "o"

@Entity()
export class Profile {
    @PrimaryColumn({ type: "varchar", length: 36 })
    @Generated("uuid")
    id: string;

    @Column({ type: "varchar", length: 128, nullable: false })
    userId: string;

    @Column({
        type: "enum",
        enum: ["m", "f", "o"],
        default: null,
        nullable: true
    })
    gender: UserGenderType

    @Column({ type: "mediumtext", nullable: true })
    photo: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone: string;

    @Column({ type: "mediumtext", nullable: true })
    about: string;

    @Column({ type: "varchar", length: 80, nullable: true })
    profession: string;

    @Column({ type: "date", nullable: true })
    birth: any;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: any

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: any

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: any

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: User;

}