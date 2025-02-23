import { UserBasic } from "../service/user.service";

export interface Post {
    id: number;
    uuid: string;
    author: UserBasic;
    type: ContentType;
    text: string | null;
    content: string;

    rating: number;
    createdAt: Date;

    commentAmount: number;

    user: User;
}

export enum ContentType {
    IMAGE = "IMAGE", TIKTOK = "TIKTOK"
}

export interface User {
    rating: number;
    postListIds: number[];
}