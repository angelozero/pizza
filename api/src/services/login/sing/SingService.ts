import { sign } from "jsonwebtoken"
import { UserModel } from "../../user/interfaces/UserModel"

sign

class SingService {
    async excute(user: UserModel) {
        try {


            const token = sign(
                {
                    name: user.name,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: '30d'
                }
            )

            return token;

        } catch (error) {
            throw new Error(`[SingService] - ${error.message}`)
        }
    }

}

export { SingService }