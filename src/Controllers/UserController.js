import knex from "../database/connection"

import bcrypt from "bcrypt"
import Util from "../Utils/utils"

class UserController{
    async store(req, res){
        const { name, email, password, atuação, city, uf} = req.body 
        
        const [userExists] = await knex("users").where("email", email)

        if (userExists){
            return res.status(401).json({ error: "E-mail already in use"})
        }

        bcrypt.hash(password, 8, async (err, hash) => {
            const password_hash = hash

            await knex("users").insert({
                name,
                email,
                password: password_hash,
                atuação,
                city,
                uf
            })
        })

        return res.json({
            name,
            email,
        })
    }

    async list(req, res){
        const { id } = req.params
        
        const user = await knex("users").where("id", id)
        .select("name", "email", "atuação", "city", "uf")

        if (!user){
            return res.status(401).json({ error: "User does not exists"})
        }

        const [{name, email, atuação, city, uf}] = user

        return res.json({
            id,
            name,
            email,
            atuação,
            city,
            uf
        })
    
    }

    async update(req, res){
        const { name, password, email, atuação, city, uf } = req.body
        
        const id = req.userId

        const correctPassword = await Util.checkpassword(password, email)

        if (!correctPassword){
            return res.status(401).json({ error: "Password does no match"})
        }

        const image = req.file.originalname

        const user = await knex("users").where("id", id)
        .update({
            name,
            email,
            atuação,
            city,
            uf,
            image
        })

        if (!user){
            return res.status(401).json({ error: "No such user with this id"})
        }

        return res.json({
                id,
                name,
                email,
                atuação,
                city,
                uf,
                image
        })
    }
}


export default new UserController()