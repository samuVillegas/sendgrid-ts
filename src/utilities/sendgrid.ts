import sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'
dotenv.config()
sgMail.setApiKey(process.env.API_KEY_SENDGRID)

export default async (
  userEmails: Array<string>,
  params: object,
  templateId: string
) => {
  const msj = {
    to: userEmails,
    from: 'villegassamuel25@yopmail.com',
    templateId: templateId,
    dynamic_template_data: params
  }

  console.log(msj)

  sgMail
    .send(msj)
    .then(() => {
        console.log('Email send')
    })
    .catch(error => {

        console.error(error.response.body.errors)
    })
}
