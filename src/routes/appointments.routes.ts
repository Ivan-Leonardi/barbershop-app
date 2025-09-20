/* eslint-disable camelcase */
import { Router } from 'express'
import { parseISO } from 'date-fns'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { AppDataSource } from '../database/data-source'
import Appointment from '../entities/Appointment'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = AppDataSource.getRepository(Appointment)
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    return response.json(appointment)
  } catch (err) {
    return response
      .status(400)
      .json({ error: err instanceof Error ? err.message : String(err) })
  }
})

export default appointmentsRouter
