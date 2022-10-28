export interface OrderResponse {
    id: string,
    table: number,
    status?: boolean,
    draft?: boolean,
    name: string,
}