import { compare } from "bcryptjs";


class ValidatePasswordService {
    async execute(userPassword: string, userHashPassword: string) {

        const passwordMatch = await compare(userPassword, userHashPassword);

        if (!passwordMatch) {
            throw new Error('[ValidatePasswordService] - Invalid password');
        }
    }
}

export { ValidatePasswordService }