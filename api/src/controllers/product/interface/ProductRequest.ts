import { CategoryRequest } from "../../category/interface/CategoryRequest";

export interface ProductRequest {
    name: string,
    price: string,
    description: string,
    banner: string,
    category: CategoryRequest
}