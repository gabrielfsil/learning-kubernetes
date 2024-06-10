const amqp = require('amqplib');
import {Channel} from 'amqplib';
import {ISendDTO} from '../dtos/ISendDTO';
import {IQueueProvider} from '../model/IQueueProvider';

class RabbitMQProvider implements IQueueProvider {
  private channel: Channel | undefined;
  constructor() {}

  public async init(): Promise<void> {
    try {
      const connection = await amqp.connect('amqp://rabbitmq');

      this.channel = await connection.createChannel();
    } catch (err) {
      console.log(err);
      throw new Error('Channel not initialized');
    }
  }

  public async consume({process, queue}: ISendDTO): Promise<void> {
    try {
      if (this.channel) {
        this.channel.assertQueue(queue, {
          durable: true,
        });

        this.channel.consume(queue, process, {
          // automatic acknowledgment mode,
          // see /docs/confirms for details
          noAck: true,
        });
      } else {
        await this.init();
        await this.consume({process, queue});
      }
    } catch (err) {
      console.log(err);
      throw new Error('Consumer not initialized');
    }
  }
}

export {RabbitMQProvider};
