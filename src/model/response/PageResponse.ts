export interface PageResponse<T> {
    content: T[];
    number: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
}