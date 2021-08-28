import express from 'express'
import { router } from './Routes/router'

const app = express()

app.use(express.json())
app.use(router)

export {app}