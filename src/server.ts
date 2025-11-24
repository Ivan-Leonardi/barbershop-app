import express, { Request, Response, NextFunction } from 'express'
import routes from './routes'
import { initDB } from './database'
import upload from './config/upload'
import AppError from './errors/AppError'

const app = express()
app.use(express.json())
app.use('/files', express.static(upload.directory))
app.use(routes)


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

initDB().then(() => {
  app.listen(3333, () => {
    console.log('🚀 Server is running on http://localhost:3333')
  })
})
