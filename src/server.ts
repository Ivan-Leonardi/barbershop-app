import express from 'express'
import routes from './routes'
import { initDB } from './database'

const app = express()
app.use(express.json())
app.use(routes)

initDB().then(() => {
  app.listen(3333, () => {
    console.log('🚀 Server is running on http://localhost:3333')
  })
})
