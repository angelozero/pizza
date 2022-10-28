import prismaClient from "../../prisma";
import { UserModelResponse } from "./interfaces/UserModelResponse";

class FindUserByIdService {
    async execute(userId: string): Promise<UserModelResponse> {
        if (!userId) {
            throw new Error('[FindUserByIdService] - id was not provided');
        }
        try {
            const userData = await prismaClient.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });

            return userData as UserModelResponse;
       
        } catch (error) {
            throw new Error(`[FindUserByIdService] - ${error.message}`)
        }
    }
}

export { FindUserByIdService }