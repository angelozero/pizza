import { UserModel } from "../../user/interfaces/UserModel";

import { ValidateUserService } from "../../user/ValidateUserService";
import { FindUserByEmailService } from "../../user/FindUserByEmailService";

import { SingService } from "../sing/SingService";
import { AuthUserModel } from "../sing/interfaces/AuthUserModel";
import { ValidatePasswordService } from "../sing/ValidatePasswordService";
import { FindUserPasswordByEmailService } from "../../user/FindUserPasswordByEmailService";

class AuthService {
    async execute(user: UserModel): Promise<AuthUserModel> {

        const validateUserService = new ValidateUserService();
        const findUserdByEmailService = new FindUserByEmailService();
        const findUserPasswordByEmailService = new FindUserPasswordByEmailService();
        const singService = new SingService();
        const validatePasswordService = new ValidatePasswordService();

        try {
            await validateUserService.execute(user);

            const password = await findUserPasswordByEmailService.execute(user.email);
            await validatePasswordService.execute(user.password, password);

            const userData = await findUserdByEmailService.execute(user);
            const token = await singService.excute(userData as UserModel);

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





export { AuthService }