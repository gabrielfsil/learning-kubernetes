import {ISendMailDTO} from '../dtos/ISendMailDTO';
import {IMailProvider} from '../model/IMailProvider';

class EtherealProvider implements IMailProvider {
  public async send({to, from, subject, body}: ISendMailDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export {EtherealProvider};
