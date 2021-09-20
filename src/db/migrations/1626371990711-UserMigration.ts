import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1626371990711 implements MigrationInterface {
    name = 'UserMigration1626371990711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `username` varchar(50) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, `phone` varchar(20) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile` (`id` int NOT NULL AUTO_INCREMENT, `userId` varchar(255) NOT NULL, `gender` varchar(255) NOT NULL, `photo` varchar(255) NOT NULL, `deleted` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `REL_a24972ebd73b106250713dcddd` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_a24972ebd73b106250713dcddd9`");
        await queryRunner.query("DROP INDEX `REL_a24972ebd73b106250713dcddd` ON `profile`");
        await queryRunner.query("DROP TABLE `profile`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
