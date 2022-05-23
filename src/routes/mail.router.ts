import express, { Request, Response } from 'express'
import sendEmail from '../utilities/sendgrid'
export const mailRouter = express.Router()

mailRouter.get('/', async (_req: Request, res: Response) => {
  try {
    await sendEmail(
      ['samuel.villegas@agileinnova.org'],
      {
        subject: 'Hola mundo',
        name: 'Samuel Villegas'
      },
      'd-0e51285c5ba14c3b9504247713f2c7c2'
    )
    res.status(200).send('Mail send')
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})
