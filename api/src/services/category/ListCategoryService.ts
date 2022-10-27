import prismaClient from "../../prisma";
import { CategoryModel } from "./interfaces/CategoryModel";
import { ValidateCategoryService } from "./ValidateCategoryService";

class ListCategoryService {
    async execute(): Promise<CategoryModel[]> {

        const validateCategoryService = new ValidateCategoryService();

        try {
            const categorysList = await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                }
            })

            return categorysList;

        } catch (error) {
            throw new Error(`[CreateCategoryService] - ${error.message}`)
        }
    }
}

export { ListCategoryService }