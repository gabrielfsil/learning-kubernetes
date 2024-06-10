import {ISendMailDTO} from '../dtos/ISendMailDTO';

interface IMailProvider {
  send(data: ISendMailDTO): Promise<void>;
}

export {IMailProvider};
