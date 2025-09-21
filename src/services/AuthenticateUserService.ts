import { AppDataSource } from '../database/data-source'
import User from '../entities/User'
import bcrypt from 'bcryptjs'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({ email })

    if (!user) {
      throw new Error('Incorrect email/password combination.')
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.')
    }

    return {
      user,
    }
  }
}
export default AuthenticateUserService
