import { Response } from "./Response";

export interface TokenResponse extends Response {
  token: string;
}