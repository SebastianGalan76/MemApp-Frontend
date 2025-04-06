import { Post } from "./Post";
import { PageResponse } from "./response/PageResponse";
import { User } from "./User";

export interface UserCollection {
    id: number;
    uuid: string;

    name: string;
    author: User;
    accessibility: Accessibility;
    content: PageResponse<Post>;
}

export enum Accessibility {
    PUBLIC = "PUBLIC", NOT_PUBLIC = "NOT_PUBLIC", PRIVATE = "PRIVATE"
}