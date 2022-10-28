import prismaClient from "../../prisma";
import { FindUserByIdService } from "./FindUserByIdService";
import { UserModel } from "./interfaces/UserModel";

class DetailUserService {
    async execute(userId: string): Promise<UserModel> {
        const service = new FindUserByIdService();
        try {
            return service.execute(userId);

        } catch (error) {
            throw new Error(`[DetailUserService] - ${error.message}`)
        }
    }
}

export { DetailUserService }