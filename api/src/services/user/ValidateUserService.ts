import { UserModel } from "./model/UserModel";

class ValidateUserService {
    async execute(user: UserModel) {
        if (!user) {
            throw new Error('User was not informed')
        }
        if (!user.name) {
            throw new Error('User name was not informed')
        }
        if (!user.email) {
            throw new Error('User email was not informed')
        }
        if (!user.password) {
            throw new Error('User password was not informed')
        }
    }
}

export { ValidateUserService }