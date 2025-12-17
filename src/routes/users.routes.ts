import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return response.json(userWithoutPassword)
  } catch (err) {
    return response
      .status(400)
      .json({ error: err instanceof Error ? err.message : String(err) })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    })

    const { password: _, ...userWithoutPassword } = user

    return response.json(userWithoutPassword)

    return response.json(userWithoutPassword)
  },
)

export default usersRouter
