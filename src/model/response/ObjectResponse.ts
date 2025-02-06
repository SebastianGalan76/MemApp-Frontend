export interface ObjectResponse<T> {
    success: boolean;
    message: string;
    errorCode: number;
    object: T
}