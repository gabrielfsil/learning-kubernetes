import {ISendDTO} from '../dtos/ISendDTO';

interface IQueueProvider {
  send(data: ISendDTO): Promise<void>;
}

export {IQueueProvider};
