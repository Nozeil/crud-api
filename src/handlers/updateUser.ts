import { RequestListener } from 'http';
import { isUUID } from '../utils/isUUID';
import { db } from '../db';
import { isReqDataValid } from '../utils/isReqDataValid';
import { updateUserInDb } from '../utils/updateUserInDb';

export const updateUser: RequestListener = (req, res) => {
  const url = req.url;

  if (url) {
    const uuid = url.slice('/api/users/'.length);

    if (!isUUID(uuid)) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Invalid id' }));
      return;
    }

    const userIndex = db.findIndex((user) => user.id === uuid);

    if (userIndex >= 0) {
      const body: Uint8Array[] = [];
      req
        .on('data', (chunk) => body.push(chunk))
        .on('end', () => {
          const data = Buffer.concat(body).toString();
          const isValid = isReqDataValid(data);

          if (isValid) {
            const user = updateUserInDb(data, userIndex);
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: 'Invalid request body' }));
          }
        });
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User with this id does not exist' }));
    }
  }
};
