export interface UserProfile {
    id: number;
    login: string;
    avatar: string;
    role: string;

    userList: PostListDto[];
}

export interface PostListDto {
    id: number;
    name: string;
    postAmount: number;
}