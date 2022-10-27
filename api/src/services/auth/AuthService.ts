import { UserModel } from "../user/model/UserModel";

import { ValidateUserService } from "../user/ValidateUserService";
import { FindUserByEmailService } from "../user/FindUserByEmailService";

import { SingService } from "../sing/SingService";
import { AuthUserRespone } from "../sing/model/AuthUserRespone";
import { ValidatePasswordService } from "../sing/ValidatePasswordService";
import { FindUserPasswordByEmailService } from "../user/FindUserPasswordByEmailService";

class AuthService {
    async execute(user: UserModel): Promise<AuthUserRespone> {
        try {
            await getValidateUserService().execute(user);

            const password = await getFindUserPasswordByEmailService().execute(user);
            await getValidatePasswordService().execute(user.password, password);
            
            const userData = await getFindUserdByEmailService().execute(user);
            const token = await getSingService().excute(userData as UserModel);

            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                token
            };
        }

        catch (error: any) {
            throw new Error(`[AuthUserService] - ${error.message}`);
        }
    }
}

function getValidateUserService() {
    return new ValidateUserService();
}

function getFindUserdByEmailService() {
    return new FindUserByEmailService();
}

function getFindUserPasswordByEmailService() {
    return new FindUserPasswordByEmailService();
}

function getSingService() {
    return new SingService();
}

function getValidatePasswordService() {
    return new ValidatePasswordService();
}

export { AuthService }