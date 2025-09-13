import Appointment from '../entities/Appointment'
import { AppDataSource } from '../database/data-source'

class AppointmentsRepository {
  private repository = AppDataSource.getRepository(Appointment)

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.repository.findOne({
      where: {
        date,
      },
    })

    return findAppointment || null
  }
}

export default AppointmentsRepository
