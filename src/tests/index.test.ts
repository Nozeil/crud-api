import 'dotenv/config';
import type { User, Users } from '../db';

const PORT = process.env.PORT;

const compareUsers = (recievedUser: User, user: Omit<User, 'id'>) => {
  const userCopy: Partial<User> = Object.assign({}, recievedUser);
  delete userCopy.id;
  expect(userCopy).toEqual(user);
};

describe('requests test', () => {
  let userId = '';

  const newUser = {
    username: 'User',
    age: 20,
    hobbies: [],
  };

  const updatedUser = {
    username: 'User',
    age: 30,
    hobbies: ['basketball'],
  };

  test('should get all users after server start, empty array expected', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users`);
    const users: Users = await resp.json();

    expect(users.length).toBe(0);
  });

  test('should create new user, user with the same data expected in response', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newUser),
    });

    const createdUser: User = await resp.json();
    userId = createdUser.id;
    compareUsers(createdUser, newUser);
  });

  test('should get created user by id', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users/${userId}`);
    const user = await resp.json();
    compareUsers(user, newUser);
  });

  test('should update created user by id', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(updatedUser),
    });
    const user = await resp.json();
    compareUsers(user, updatedUser);
  });

  test('should delete created user by id', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: 'DELETE',
    });

    expect(resp.status).toBe(204);
  });

  test('should get 404 code when trying to get deleted user', async () => {
    const resp = await fetch(`http://localhost:${PORT}/api/users/${userId}`);

    expect(resp.status).toBe(404);
  });
});
