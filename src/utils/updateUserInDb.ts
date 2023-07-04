import { db } from '../db';

export const updateUserInDb = (data: string, userIndex: number) => {
  const parsedData = JSON.parse(data);
  const user = db[userIndex];

  const updatedUser = {
    id: user.id,
    username: parsedData?.username ?? user.username,
    age: parsedData?.age ?? user.age,
    hobbies: parsedData?.hobbies ?? user.hobbies,
  };

  db[userIndex] = updatedUser;

  return updatedUser;
};
