export interface Meme {
    user: User;
    type: MemeType;
    text: string | null;
    content: string;
    ratings: number;
}

export enum MemeType {
    DEFAULT, TIKTOK, X
}

export interface User {
    id: number;
    login: string;
    profilePictureUrl: string | null;
}