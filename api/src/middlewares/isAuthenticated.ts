import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { PayloadModel } from "./interfaces/PayloadModel";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {

        const { sub } = verify(
            token,
            process.env.JWT_SECRET,
        ) as PayloadModel;

        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).end();
    }

}

