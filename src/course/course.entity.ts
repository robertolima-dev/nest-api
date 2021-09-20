import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn, Generated, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Course {
    @PrimaryColumn({ type: "varchar", length: 36 })
    @Generated("uuid")
    id: string;

    @Column({ type: "varchar", length: 60 })
    title: string;

    @Column({ type: "varchar", length: 254 })
    description: string;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: any

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: any

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: any
}