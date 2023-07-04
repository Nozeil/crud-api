import http, { STATUS_CODES } from 'http';
import { createUser } from './handlers/createUser';
import { getUsers } from './handlers/getUsers';
import { getUser } from './handlers/getUser';
import { updateUser } from './handlers/updateUser';
import { deleteUser } from './handlers/deleteUser';
import 'dotenv/config';

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  new Promise((_, reject) => {
    req.on('error', (e) => reject(e));
    res.on('error', (e) => reject(e));
  }).catch(() => {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: STATUS_CODES[500] }));
  });

  try {
    const { method, url } = req;
    res.setHeader('Content-type', 'application/json');

    switch (true) {
      case method === 'GET' && url === '/api/users':
        getUsers(req, res);
        break;
      case method === 'GET' && url?.startsWith('/api/users/'):
        getUser(req, res);
        break;
      case method === 'POST' && url === '/api/users':
        createUser(req, res);
        break;
      case method === 'PUT' && url?.startsWith('/api/users/'):
        updateUser(req, res);
        break;
      case method === 'DELETE' && url?.startsWith('/api/users/'):
        deleteUser(req, res);
        break;
      default:
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Invalid endpoint' }));
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: STATUS_CODES[500] }));
  }
});

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
