const express = require('express');
import {Request, Response} from 'express';
import {QueueProvider} from '../../containers/QueueProvider';
const client = require('prom-client');

const register = new client.Registry();
register.setDefaultLabels({
  app: 'consumer',
});
client.collectDefaultMetrics({register});

const app = express();

app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.end(metrics);
});

QueueProvider.consume({
  queue: 'email',
  process: async msg => {
    const {total} = JSON.parse(msg.content.toString());

    const primes: number[] = [];
    for (let i = 2; i < Number(total); i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(i);
      }
    }
    console.log(`Total primes between ${2} and ${total}: ${primes.length}`);

    return;
  },
});

app.listen(3334, () => console.log('Worker is running in port 3334'));
