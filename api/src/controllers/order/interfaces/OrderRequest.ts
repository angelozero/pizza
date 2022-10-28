export interface OrderRequest {
    table: number,
    status?: boolean,
    draft?: boolean,
    name: string,
}