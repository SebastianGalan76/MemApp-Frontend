import { User } from "../service/user.service";

export interface Comment {
    id: number;
    author: User;
    content: string;
    reply: ReplyDto;
    createdAt: Date;

    userRating: number;
    likeAmount: number;
    dislikeAmount: number;
}

export interface ReplyDto {
    totalReplies: number;
    currentPage: number;
    replies: Comment[];
}