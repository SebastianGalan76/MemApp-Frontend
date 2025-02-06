export interface UserMemeList {
    id: number;
    name: string;
    color: string;
    uuid: string;
    accessibility: Accessibility;
}

export enum Accessibility {
    PUBLIC, NOT_PUBLIC, PRIVATE
}