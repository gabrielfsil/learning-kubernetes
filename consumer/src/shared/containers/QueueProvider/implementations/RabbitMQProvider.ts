const amqp = require('amqplib');
import {ISendDTO} from '../dtos/ISendDTO';
import {IQueueProvider} from '../model/IQueueProvider';

class RabbitMQProvider implements IQueueProvider {
  constructor() {}

  public async consume({process, queue}: ISendDTO): Promise<void> {
    try {
      const connection = await amqp.connect('amqp://rabbitmq');

      const channel = await connection.createChannel();

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(queue, process, {
        // automatic acknowledgment mode,
        // see /docs/confirms for details
        noAck: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export {RabbitMQProvider};
