import { Router } from 'express'

const appointmentsRoutes = Router()

appointmentsRoutes.get('/', (request, response) => {
  return response.json({ message: 'List of appointments' })
})

export default appointmentsRoutes
