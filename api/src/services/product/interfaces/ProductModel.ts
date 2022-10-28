import { CategoryModel } from "../../category/interfaces/CategoryModel";

export interface ProductModel {
    id?: string,
    name: string,
    price: string,
    description: string,
    banner: string,
    category: CategoryModel
}