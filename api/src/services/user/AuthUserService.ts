import { UserModel } from "./model/UserModel";

import { ValidateUserService } from "./ValidateUserService";
import { FindUserByEmailService } from "./FindUserByEmailService";

import { compare } from "bcryptjs";


class AuthUserService {
    async execute(user: UserModel) {
        try {
            await getValidateUserService().execute(user);

            const userData = await getFindUserByEmailService().execute(user);

            const passwordMatch = await compare(user.password, userData.password);

            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            return { ok: true };

        }
        catch (error: any) {
            throw new Error(`[AuthUserService] - ${error.message}`);
        }
    }
}

function getValidateUserService() {
    return new ValidateUserService();
}

function getFindUserByEmailService() {
    return new FindUserByEmailService();
}

export { AuthUserService }