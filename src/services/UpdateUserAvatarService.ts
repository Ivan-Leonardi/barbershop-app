import path from 'path'
import fs from 'fs'
import { AppDataSource } from '../database/data-source'
import User from '../entities/User'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError'

interface IRequest {
  userId: string
  avatarFileName: string
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { id: userId },
    })

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
