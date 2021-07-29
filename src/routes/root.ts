import express, { Request, Response } from 'express';

const route = express.Router();

route.get('/', (_request: Request,
  response: Response): void => {
  response.json({
    status: 'ok',
  });
});

export default route;