import prismaClient from "../../prisma";
import { FindCategoryByIdService } from "../category/FindCategoryByIdService";
import { CategoryModel } from "../category/interfaces/CategoryModel";


class FindProductByCategoryIdService {
    async execute(categoryId: string): Promise<CategoryModel[]> {

        const categoryService = new FindCategoryByIdService();

        try {
            if (!categoryId) {
                throw new Error('[FindProductByCategoryIdService] - category id was not informed');
            }

            const products = await prismaClient.product.findMany({
                where: {
                    category_id: categoryId,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    category_id: true,
                }
            })

            const productsList = await Promise.all(products.map(async product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    banner: product.banner,
                    category: await categoryService.execute(product.category_id)

                }
            }))

            return productsList;

        } catch (error) {
            throw new Error(error);
        }
    }
}

export { FindProductByCategoryIdService }