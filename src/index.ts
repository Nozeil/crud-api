import http from 'http';
import { createUser } from './handlers/createUser';
import { getUsers } from './handlers/getUsers';
import { getUser } from './handlers/getUser';
import { updateUser } from './handlers/updateUser';
import { deleteUser } from './handlers/deleteUser';

const PORT = 8000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

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
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid endpoint' }));
  }
});

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
