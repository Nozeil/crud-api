import { RequestListener } from 'http';
import { db } from '../db';
import { isUUID } from '../utils/isUUID';

export const getUser: RequestListener = (req, res) => {
  const url = req.url;

  if (url) {
    const uuid = url.slice('/api/users/'.length);

    if (!isUUID(uuid)) {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid id' }));
      return;
    }

    const user = db.find((user) => user.id === uuid);

    if (user) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'User with this id does not exist' }));
    }
  }
};
