import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserModel } from "./model/UserModel";
import { ValidateUserService } from "./ValidateUserService";
import { CheckUserEmailService } from "./CheckUserEmailService";

class CreateUserService {
    async execute(user: UserModel) {
        try {
            await getValidateUserService().execute(user);
            await getCheckUserEmailService().execute(user);

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
            
            return userCreated;
        }

        catch (error: any) {
            throw new Error(`[CreateUserService] - ${error.message}`);
        }
    }
}

function getCheckUserEmailService(){
    return new CheckUserEmailService();
}
function getValidateUserService(){
    return new ValidateUserService();
}


export { CreateUserService }