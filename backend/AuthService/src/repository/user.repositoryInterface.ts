import { User } from "../models/User.model";

export interface UserRepositoryInterface {
  addUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  getUserByUsername(email: string): Promise<User | null>;
  userNameExisted(userName: string): Promise<boolean>;
  emailExisted(email: string): Promise<boolean>;
  removeUser(id: number): Promise<boolean>;
}
