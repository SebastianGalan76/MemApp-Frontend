import { User } from "../service/user.service";

export interface Post {
    id: number;
    uuid: string;
    author: User;
    type: ContentType;
    text: string | null;
    content: string;

    rating: number;
    createdAt: Date;

    commentAmount: number;

    user: LoggedUser;
}

export enum ContentType {
    IMAGE = "IMAGE", TIKTOK = "TIKTOK"
}

export interface LoggedUser {
    rating: number;
    postListIds: number[];
}