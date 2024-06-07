const express = require('express');
import {Request, Response} from 'express';

const app = express();

app.use(express.json());
app.get(
  '/',
  async (request: Request, response: Response): Promise<Response> => {
    // add in queue
    return response.json({
      message: 'Hello World!',
    });
  }
);

app.listen(3333, () => console.log('Server is running in port 3333'));
