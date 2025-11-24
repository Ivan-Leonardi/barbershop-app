import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUserService = new AuthenticateUserService()

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user

  return response.json({ user: userWithoutPassword, token })
})

export default sessionsRouter
