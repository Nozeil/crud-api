import { RequestListener } from 'http';
import { db } from '../db';

export const getUsers: RequestListener = (_, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(db));
};
