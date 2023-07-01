import { randomUUID } from 'crypto';
import { db } from '../db';

export const addUserToDb = (data: string) => {
  const parsedData = JSON.parse(data);

  const user = {
    id: randomUUID(),
    username: parsedData?.username,
    age: parsedData?.age,
    hobbies: parsedData?.hobbies,
  };

  db.push(user);

  return user;
};
