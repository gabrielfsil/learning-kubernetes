const amqp = require('amqplib');
import {ISendDTO} from '../dtos/ISendDTO';
import {IQueueProvider} from '../model/IQueueProvider';

class RabbitMQProvider implements IQueueProvider {
  constructor() {}

  public async send({content, queue}: ISendDTO): Promise<void> {
    try {
      const connection = await amqp.connect('amqp://rabbitmq');

      const channel = await connection.createChannel();

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
    } catch (err) {
      console.log(err);
    }
  }
}

export {RabbitMQProvider};
