import prismaClient from "../../prisma";
import { UserModel } from "./interfaces/UserModel";
import { UserModelResponse } from "./interfaces/UserModelResponse";

class FindUserByEmailService {
    async execute(user: UserModel): Promise<UserModelResponse> {
        try {

            if (!user.email) {
                throw new Error('[FindUserByEmailService] - email was not provided');
            }

            const userData = await prismaClient.user.findFirst({
                where: {
                    email: user.email
                }
            });

            return userData;

        } catch (error) {
            throw new Error(error);
        }
    }
}

export { FindUserByEmailService }