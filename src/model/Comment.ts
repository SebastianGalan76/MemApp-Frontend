export interface Comment {
    id: number;
    author: Author;
    content: string;
    reply: ReplyDto;
    createdAt: Date;

    userRating: number;
    likeAmount: number;
    dislikeAmount: number;
}

export interface Author {
    id: number;
    login: string;
    profilePictureUrl: string | null;
}

export interface ReplyDto {
    totalReplies: number;
    currentPage: number;
    replies: Comment[];
}