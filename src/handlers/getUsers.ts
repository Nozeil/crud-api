import { RequestListener } from 'http';
import { db } from '../db';

export const getUsers: RequestListener = (_, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(db));
};
