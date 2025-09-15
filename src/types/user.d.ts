export type User = {
  id?: string;
  email: string;
  password: string;
  name: string;
  created_at?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
