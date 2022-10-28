import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {

        const service = new CreateProductService();

        if (!req.file || !req.body) {
            throw new Error('Error to create a product')
        }

        const productRequest = req.body;
        const { originalname, filename: banner } = req.file;

        const data = await service.execute({
            name: productRequest.name,
            price: productRequest.price,
            description: productRequest.description,
            banner: banner,
            category: {
                id: productRequest.category.id,
                name: productRequest.category.name,
            }
        });

        return res.json({ data });
    }
}

export { CreateProductController }