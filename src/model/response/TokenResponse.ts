import { User } from "../User";
import { Response } from "./Response";

export interface SignInResponse extends Response {
  token: string;
  user: User;
}