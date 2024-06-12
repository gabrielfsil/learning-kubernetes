import {Request, Response} from 'express';
const express = require('express');
import {QueueProvider} from '../../container/QueueProvider';

const client = require('prom-client');
const register = new client.Registry();
register.setDefaultLabels({
  app: 'producer',
});
client.collectDefaultMetrics({register});

const app = express();

app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.end(metrics);
});
app.use(express.json());
app.post(
  '/',
  async (request: Request, response: Response): Promise<Response> => {
    const {total} = request.body;

    QueueProvider.send({
      queue: 'email',
      content: {
        total,
      },
    });

    return response.json();
  }
);

app.listen(3333, () => console.log('Producer is running in port 3333'));
