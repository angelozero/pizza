import prismaClient from "../../prisma";
import { CategoryModel } from "./interfaces/CategoryModel";
import { ValidateCategoryService } from "./ValidateCategoryService";

class CreateCategoryService {
    async execute(category: CategoryModel): Promise<CategoryModel> {

        const validateCategoryService = new ValidateCategoryService();

        try {
            await validateCategoryService.execute(category as CategoryModel);
            const categoryCreated = await prismaClient.category.create({
                data: {
                    name: category.name,
                },
                select: {
                    id: true,
                    name: true,
                }
            })

            return categoryCreated;

        } catch (error) {
            throw new Error(`[CreateCategoryService] - ${error.message}`)
        }
    }
}

export { CreateCategoryService }