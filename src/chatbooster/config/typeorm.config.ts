import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const getORMConfig = (): MysqlConnectionOptions => {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 24001,
    username: 'root',
    password: 'root',
    database: 'chatbooster',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
  };
};
