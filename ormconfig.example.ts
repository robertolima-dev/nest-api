import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'database',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config