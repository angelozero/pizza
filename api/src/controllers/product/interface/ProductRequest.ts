import { CategoryRequest } from "../../category/interface/CategoryRequest";

export interface ProductRequest {
    id?: string,
    name: string,
    price: string,
    description: string,
    banner: string,
    category: CategoryRequest
}