import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")} )

export default {
    port: process.env.PORT,
    database_uri:process.env.MONGODB_URI,
    salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
}