import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gobarber',
  database: 'gobarber_postgres',
  synchronize: true, // ⚠️ use só em dev, nunca em produção
  logging: true,
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
})
