import {ISendMailDTO} from '../dtos/ISendMailDTO';
import {IMailProvider} from '../model/IMailProvider';
const nodemailer = require('nodemailer');

class EtherealProvider implements IMailProvider {
  constructor() {}

  public async send({to, from, subject, body}: ISendMailDTO): Promise<void> {
    try {
      const account = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      const info = await transporter.sendMail({
        from: {
          name: from.name,
          address: from.email,
        },
        to: {
          address: to.email,
          name: to.name,
        },
        subject,
        text: body,
      });

      console.log('Message ID %s', info.messageId);
      console.log('%s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.log(err);
      throw new Error('Client not initialized');
    }
  }
}

export {EtherealProvider};
