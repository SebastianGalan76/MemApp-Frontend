export interface Comment {
    id: number;
    author: Author;
    content: string;
    replies: Comment[];

}

export interface Author {
    id: number;
    login: string;
    profilePictureUrl: string | null;
}