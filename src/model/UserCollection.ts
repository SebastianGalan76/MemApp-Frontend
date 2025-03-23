import { Post } from "./Post";
import { PageResponse } from "./response/PageResponse";
import { User } from "./User";

export interface UserCollection {
    id: number;
    uuid: string;

    name: string;
    author: User;
    content: PageResponse<Post>;
}