import { AppDataSource } from '../database/data-source'
import User from '../entities/User'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
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

    const token = sign({}, 'secret-key', {
      subject: user.id,
      expiresIn: '1d',
    })

    return {
      user,
      token,
    }
  }
}
export default AuthenticateUserService
