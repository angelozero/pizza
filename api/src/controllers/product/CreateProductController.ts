import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { ProductResponse } from "./interface/ProductResponse";

class CreateProductController {
    async handle(req: Request, res: Response) {

        const service = new CreateProductService();

        const productRequest = req.body;
        const { filename: banner } = req.file;

        const data = await service.execute({
            name: productRequest.name,
            price: productRequest.price,
            description: productRequest.description,
            banner: banner,
            categoryId: productRequest.categoryId,
        }) as ProductResponse;

        return res.json({ data });
    }
}

export { CreateProductController }