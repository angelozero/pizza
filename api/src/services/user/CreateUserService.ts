import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserModel } from "./interfaces/UserModel";
import { ValidateUserService } from "./ValidateUserService";
import { CheckUserEmailService } from "./CheckUserEmailService";
import { UserModelResponse } from "./interfaces/UserModelResponse";

class CreateUserService {
    async execute(user: UserModel): Promise<UserModelResponse> {
        const getCheckUserEmailService = new CheckUserEmailService();
        const getValidateUserService = new ValidateUserService();

        try {
            await getValidateUserService.execute(user);
            await getCheckUserEmailService.execute(user);

            const userCreated = await prismaClient.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: await hash(user.password, 8),
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            })

            return userCreated as UserModelResponse;
        }

        catch (error: any) {
            throw new Error(`[CreateUserService] - ${error.message}`);
        }
    }
}

export { CreateUserService }