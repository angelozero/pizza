import { FindUserByEmailService } from "./FindUserByEmailService";
import { UserModel } from "./model/UserModel";

class CheckUserEmailService {
    async execute(user: UserModel) {
        const userAlreadyExists = await getFindUserByEmailService().execute(user);

        if (userAlreadyExists) {
            throw new Error('[CheckUserEmailService] - User already exists');
        }
    }
}

function getFindUserByEmailService() {
    return new FindUserByEmailService();
}

export { CheckUserEmailService }