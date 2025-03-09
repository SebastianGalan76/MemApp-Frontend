import { User } from "../service/user.service";
import { Post } from "./Post";
import { PageResponse } from "./response/PageResponse";

export interface UserList {
    id: number;
    uuid: string;

    name: string;
    author: User;
    content: PageResponse<Post>;
}