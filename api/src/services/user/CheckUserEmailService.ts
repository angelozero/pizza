import { FindUserByEmailService } from "./FindUserByEmailService";
import { UserModel } from "./interfaces/UserModel";

class CheckUserEmailService {
    async execute(user: UserModel) {
        const getFindUserByEmailService = new FindUserByEmailService();
        
        const userAlreadyExists = await getFindUserByEmailService.execute(user);

        if (userAlreadyExists) {
            throw new Error('[CheckUserEmailService] - User already exists');
        }
    }
}

export { CheckUserEmailService }