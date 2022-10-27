import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";
import { CategoryRequest } from "./interface/CategoryRequest";


class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const service = new CreateCategoryService();

        const response = await service.execute(req.body as CategoryRequest);

        return res.json({ ok: response });
    }
}

export { CreateCategoryController }