import prismaClient from "../../prisma";
import { FindUserByIdService } from "./FindUserByIdService";

class DetailUserService {
    async execute(userId: string) {
        const service = new FindUserByIdService();
        try {
            return service.execute(userId);

        } catch (error) {
            throw new Error(`[DetailUserService] - ${error.message}`)
        }
    }
}

export { DetailUserService }