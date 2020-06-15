import jwt from "jsonwebtoken"

import knex from "../database/connection"

import Util from "../Utils/utils"
import authConfig from "../config/auth"

class SessionController{
    async store(req, res){
        const { email, password } = req.body

        const user = await knex("users").where("email", email).select("id", "email")

        if (!user[0]){
            return res.status(401).json({ error: "user not found"})
        }

        const checkPassword = await Util.checkpassword(password, email)

        if (!checkPassword){
            return res.status(401).json({ error: "Password does not match"})
        }

        const [{ id, name }] = user

        return res.json({
            user:{
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret , {
                expiresIn: authConfig.expiresIn
            })
        })
    }
    

}

export default new SessionController()