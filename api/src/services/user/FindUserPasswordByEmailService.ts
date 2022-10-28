import prismaClient from "../../prisma";

class FindUserPasswordByEmailService {
    async execute(userEmail: string): Promise<string> {
        if (!userEmail) {
            throw new Error('[FindUserByEmailService] - email was not provided');
        }
        try {

            const userData = await prismaClient.user.findFirst({
                where: {
                    email: userEmail
                },
                select: {
                    password: true,
                }
            });

            if (!userData) {
                throw new Error('[FindUserPasswordByEmailService] - user data was not found');
            }

            return userData.password;

        } catch (error) {
            throw new Error(`[FindUserPasswordByEmailService] - ${error.message}`)
        }
    }
}

export { FindUserPasswordByEmailService }