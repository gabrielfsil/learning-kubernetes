import {Request, Response} from 'express';
const express = require('express');
import {QueueProvider} from '../../container/QueueProvider';

const app = express();

app.use(express.json());
app.post(
  '/',
  async (request: Request, response: Response): Promise<Response> => {
    const {total} = request.body;

    for (const i of Array.from({length: Number(total)}, (v, k) => k)) {
      QueueProvider.send({
        queue: 'email',
        content: {
          to: {
            name: `Name ${i}`,
            email: `email${i}@email.com`,
          },
          from: {
            name: 'System',
            email: 'no-reply@system.com',
          },
          subject: 'Sua mensalidade vence amanhã!',
          body: `Olá Name ${i}, tudo bem?\n\n\nEstou passando aqui para lembrar que sua mensalidade vence amanhã para evitar a cobrança de juros e multas.\n\nLembre-se de ddeixar o limite disponível no seu cartão ou entre em contato com o suporte para alterar a forma de pagamento.\n\n\nAtt.\nAlfredo`,
        },
      });
    }

    return response.json();
  }
);

app.listen(3333, () => console.log('Server is running in port 3333'));