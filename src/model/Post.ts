import { Hashtag } from "./Hashtag";
import { User } from "./User";

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

    flags: PostFlag[];
    hashtags: Hashtag[];

    user: LoggedUser;
}

export enum ContentType {
    IMAGE = "IMAGE", TIKTOK = "TIKTOK", X = "X", YOUTUBE = "YOUTUBE"
}

export interface LoggedUser {
    rating: number;
    postListIds: number[];
}

export interface PostFlag {
    id: number;
    type: string;
    staffFlag: boolean;
}