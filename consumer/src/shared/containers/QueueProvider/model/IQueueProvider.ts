import {ISendDTO} from '../dtos/ISendDTO';

interface IQueueProvider {
  consume(data: ISendDTO): Promise<void>;
}

export {IQueueProvider};
