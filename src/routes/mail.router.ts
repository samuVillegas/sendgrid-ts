import express, { Request, Response } from 'express'
import { createValidator } from 'express-joi-validation'
import sendEmail from '../utilities/sendgrid'
import mailSchema from '../schemas/mail.schema'
import templateIds from '../constants/templateid.const'
import generatecode from '../utilities/generatecode'
export const mailRouter = express.Router()

mailRouter.use(express.json())

const validator = createValidator()

mailRouter.post(
  '/send_code',
  validator.body(mailSchema),
  async (_req: Request, res: Response) => {
    try {

      const { name, email } = _req.body;
      const code = generatecode();

      await sendEmail(
        email,
        {
          subject: 'Validate email',
          name,
          code
        },
        templateIds.SEND_CODE
      )
      res.status(200).send('Mail send')
    } catch (error) {
      console.log(error)
      res.status(500).send(error.message)
    }
  }
)
