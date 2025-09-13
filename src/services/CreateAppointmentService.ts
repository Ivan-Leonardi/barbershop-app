import { startOfHour } from 'date-fns'
import { AppDataSource } from '../database/data-source'
import Appointment from '../entities/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface IRequest {
  provider: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = new AppointmentsRepository()
    const repository = AppDataSource.getRepository(Appointment)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate =
      await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = repository.create({
      provider,
      date: appointmentDate,
    })

    await repository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
