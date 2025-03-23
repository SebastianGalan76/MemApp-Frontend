export interface User {
    id: number;
    login: string;
    avatar: string;

    email: string;
    role: string;
    ownedCollections: UserCollection[];
}

export interface UserCollection {
    id: number;
    name: string;
    color: string;
    uuid: string;
    accessibility: Accessibility;
}

export enum Accessibility {
    PUBLIC, NOT_PUBLIC, PRIVATE
}