import prismaClient from "../../prisma";
import { UserModel } from "./model/UserModel";

class FindUserByEmailService {
    async execute(user: UserModel) {
        if (!user.email) {
           throw new Error('[FindUserByEmailService] - email was not provided');
        }

        const userData =  await prismaClient.user.findFirst({
            where: {
                email: user.email
            }
        }) as UserModel;

        if (!userData) {
            throw new Error('[FindUserByEmailService] - user data was not found');
         }

         return userData;
    }
}

export { FindUserByEmailService }