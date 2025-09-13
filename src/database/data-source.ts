import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'gobarber_postgres',
  synchronize: false,
  logging: true,
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/database/migrations/**/*.ts'],
  subscribers: [],
})
