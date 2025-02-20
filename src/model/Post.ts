export interface Post {
    id: number;
    uuid: string;
    owner: Owner;
    type: ContentType;
    text: string | null;
    content: string;

    rating: number;
    createdAt: Date;

    user: User;
}

export enum ContentType {
    IMAGE = "IMAGE", TIKTOK = "TIKTOK"
}

export interface User {
    rating: number;
    postListIds: number[];
}

export interface Owner {
    id: number;
    login: string;
    profilePictureUrl: string | null;
}