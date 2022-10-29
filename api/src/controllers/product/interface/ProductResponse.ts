import { CategoryResponse } from "../../category/interface/CategoryResponse";

export interface ProductResponse {
    id?: string,
    name: string,
    price: string,
    description: string,
    banner: string,
    categoryId: string,
}