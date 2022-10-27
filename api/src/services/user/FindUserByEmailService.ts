import prismaClient from "../../prisma";
import { UserModel } from "./interfaces/UserModel";
import { UserModelResponse } from "./interfaces/UserModelResponse";

class FindUserByEmailService {
    async execute(user: UserModel): Promise<UserModelResponse> {
        if (!user.email) {
           throw new Error('[FindUserByEmailService] - email was not provided');
        }

        const userData =  await prismaClient.user.findFirst({
            where: {
                email: user.email
            }
        });

         return userData;
    }
}

export { FindUserByEmailService }