export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  api_key: string;
  api_key_used: boolean;
}


export interface CustomRequest {
  user: IUser
  file: object
  params: object
  query: object
  path: object
}