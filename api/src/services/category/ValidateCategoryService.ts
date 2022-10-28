import { CategoryModel } from "./interfaces/CategoryModel";

class ValidateCategoryService {
    async execute(category: CategoryModel) {

        if (!category) {
            throw new Error('[ValidateCategoryService] - category was not informed')
        }

        if (!category.name) {
            throw new Error('[ValidateCategoryService] - category name was not informed')
        }

    }
}

export { ValidateCategoryService }