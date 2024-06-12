import {Transporter} from 'nodemailer';
import {ISendMailDTO} from '../dtos/ISendMailDTO';
import {IMailProvider} from '../model/IMailProvider';
const nodemailer = require('nodemailer');

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

class EtherealProvider implements IMailProvider {
  private transporter: Transporter;
  constructor() {
    this.transporter = {} as Transporter;
  }

  public async init(): Promise<void> {
    try {
      const account = await nodemailer.createTestAccount();

      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error('Client not initialized');
    }
  }

  public async send({to, from, subject, body}: ISendMailDTO): Promise<void> {
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const info = await this.transporter.sendMail({
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
        return;
      } catch (err: unknown) {
        console.error('Error occurred while sending email');
        retries += 1;
        if (retries < MAX_RETRIES) {
          console.log(`Retrying... (${retries}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
          throw new Error('Request not sent');
        }
      }
    }
  }
}

export {EtherealProvider};
