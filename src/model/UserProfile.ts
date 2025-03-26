export interface UserProfile {
    id: number;
    login: string;
    avatar: string;
    role: string;

    following: boolean;

    userList: PostListDto[];
}

export interface PostListDto {
    id: number;
    uuid: string;
    name: string;
    postAmount: number;
}