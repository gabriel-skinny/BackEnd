import bcrypt from "bcrypt"

import knex from "../database/connection"

class Util{
    
    
    async checkpassword(password, email){
        const [{password:password_hash}] = await knex("users").where("email", email).select("password")

        return bcrypt.compare(password, password_hash)
    }
}

export default new Util()