import { Request, Response } from "express";

import { ListCategoryService } from "../../services/category/ListCategoryService";
import { CategoryResponse } from "./interface/CategoryResponse";

class ListCategoryController {
    async handle(req: Request, res: Response) {

        const service = new ListCategoryService();

        const data = await service.execute() as CategoryResponse[];

        return res.json({ data });
    }
}

export { ListCategoryController }