export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | never[];
}

type Users = User[];

export const db: Users = [];
