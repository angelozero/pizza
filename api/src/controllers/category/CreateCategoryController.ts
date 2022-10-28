import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";
import { CategoryRequest } from "./interface/CategoryRequest";
import { CategoryResponse } from "./interface/CategoryResponse";


class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const service = new CreateCategoryService();

        const data = await service.execute(req.body as CategoryRequest) as CategoryResponse;

        return res.json({ data });
    }
}

export { CreateCategoryController }