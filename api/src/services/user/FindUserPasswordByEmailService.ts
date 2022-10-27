import prismaClient from "../../prisma";
import { UserModel } from "./model/UserModel";

class FindUserPasswordByEmailService {
    async execute(user: UserModel): Promise<string> {
        if (!user.email) {
            throw new Error('[FindUserByEmailService] - email was not provided');
        }

        const userData = await prismaClient.user.findFirst({
            where: {
                email: user.email
            },
            select: {
                password: true,
            }
        });

        if (!userData) {
            throw new Error('[FindUserPasswordByEmailService] - user data was not found');
        }

        return userData.password;
    }
}

export { FindUserPasswordByEmailService }