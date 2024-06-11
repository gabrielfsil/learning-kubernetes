const express = require('express');
import {Request, Response} from 'express';
import {MailProvider} from '../../containers/MailProvider';
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
    const content = JSON.parse(msg.content.toString());

    const {to, from, subject, body} = content;

    MailProvider.send({
      to: {
        name: to.name,
        email: to.email,
      },
      from: {
        name: from.name,
        email: from.email,
      },
      subject,
      body,
    }).catch(err => console.error(err));
  },
});

app.listen(3334, () => console.log('Worker is running in port 3334'));
