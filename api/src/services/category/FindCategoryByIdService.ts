import prismaClient from "../../prisma";
import { CategoryModel } from "./interfaces/CategoryModel";
import { ValidateCategoryService } from "./ValidateCategoryService";

class FindCategoryByIdService {
    async execute(categoryId: string): Promise<CategoryModel> {

        const validateCategoryService = new ValidateCategoryService();

        if (!categoryId) {
            throw new Error('[FindCategoryByIdService] - category id was not informed')
        }

        try {
            const category = await prismaClient.category.findFirst({
                where: {
                    id: categoryId,
                },
                select: {
                    id: true,
                    name: true,
                }
            })

            return category;

        } catch (error) {
            throw new Error(error)
        }
    }
}

export { FindCategoryByIdService }