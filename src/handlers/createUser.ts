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
        res.statusCode = 201;
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid request body' }));
      }
    });
};
