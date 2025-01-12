import { User } from "../../service/user.service";
import { Response } from "./Response";

export interface SignInResponse extends Response {
  token: string;
  user: User;
}