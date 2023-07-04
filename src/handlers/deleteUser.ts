import { RequestListener } from 'http';
import { isUUID } from '../utils/isUUID';
import { db } from '../db';

export const deleteUser: RequestListener = (req, res) => {
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
      db.splice(userIndex, 1);
      res.statusCode = 204;
      res.end();
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User with this id does not exist' }));
    }
  }
};
