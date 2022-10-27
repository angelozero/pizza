import { UserModel } from "../../user/interfaces/UserModel";

import { ValidateUserService } from "../../user/ValidateUserService";
import { FindUserByEmailService } from "../../user/FindUserByEmailService";

import { SingService } from "../sing/SingService";
import { AuthUserRespone } from "../sing/interfaces/AuthUserRespone";
import { ValidatePasswordService } from "../sing/ValidatePasswordService";
import { FindUserPasswordByEmailService } from "../../user/FindUserPasswordByEmailService";

class AuthService {
    async execute(user: UserModel): Promise<AuthUserRespone> {

        const getValidateUserService = new ValidateUserService();
        const getFindUserdByEmailService = new FindUserByEmailService();
        const getFindUserPasswordByEmailService = new FindUserPasswordByEmailService();
        const getSingService = new SingService();
        const getValidatePasswordService = new ValidatePasswordService();

        try {
            await getValidateUserService.execute(user);

            const password = await getFindUserPasswordByEmailService.execute(user.email);
            await getValidatePasswordService.execute(user.password, password);

            const userData = await getFindUserdByEmailService.execute(user);
            const token = await getSingService.excute(userData as UserModel);

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