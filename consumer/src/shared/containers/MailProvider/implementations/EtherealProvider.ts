import {TestAccount, Transporter} from 'nodemailer';
import {ISendMailDTO} from '../dtos/ISendMailDTO';
import {IMailProvider} from '../model/IMailProvider';
const nodemailer = require('nodemailer');

class EtherealProvider implements IMailProvider {
  private client: Transporter | undefined;
  constructor() {
    nodemailer.createTestAccount().then((account: TestAccount) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        tls: {
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2',
        },
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }
  public async send({to, from, subject, body}: ISendMailDTO): Promise<void> {
    try {
      if (this.client) {
        const info = await this.client.sendMail({
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
      } else {
        throw new Error('Client not initialized');
      }
    } catch (err) {
      console.log(err);
      throw new Error('Client not initialized');
    }
  }
}

export {EtherealProvider};
