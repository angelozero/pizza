import { sign } from "jsonwebtoken"
import { UserModel } from "../user/model/UserModel"

sign

class SingService {
    async excute(user: UserModel) {

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
    }
}

export { SingService }