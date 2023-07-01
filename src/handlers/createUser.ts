import { RequestListener } from 'http';
import { addUserToDb } from '../utils/addUserToDb';
import { isReqDataValid } from '../utils/isReqDataValid';

export const createUser: RequestListener = (req, res) => {
  const body: Uint8Array[] = [];

  req
    .on('data', (chunk) => body.push(chunk))
    .on('end', () => {
      const data = Buffer.concat(body).toString();
      const isValid = isReqDataValid(data);

      if (isValid) {
        const user = addUserToDb(data);
        res.writeHead(201, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request body' }));
      }
    });
};
