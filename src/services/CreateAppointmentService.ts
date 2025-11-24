/* eslint-disable camelcase */
import { startOfHour } from 'date-fns'
import { AppDataSource } from '../database/data-source'
import Appointment from '../entities/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface IRequest {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = new AppointmentsRepository()
    const repository = AppDataSource.getRepository(Appointment)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate,
    })

    await repository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
