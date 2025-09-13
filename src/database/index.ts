import { AppDataSource } from './data-source'

export const initDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log('📦 Banco de dados conectado com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao conectar no banco:', error)
    throw error
  }
}
