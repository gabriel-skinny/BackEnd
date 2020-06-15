import knex from "../database/connection"

class PostController{
    async create(req, res){
        const { title } = req.body
        
        const file = req.file.originalname

        const user_id = req.userId

        const [post_id] = await knex("posts").insert({
            title,
            file
        })


        await knex("user_posts").insert({
            user_id,
            post_id
        })
    
        return res.json({
            post_id,
            title,
            file
        })
    }

    async list(req, res){
        
        
        const posts = await knex("posts")
        .join("user_posts", "posts.id", "=", "user_posts.post_id")
        .join("users", "user_posts.user_id", "=", "users.id")
        .select("posts.id", "posts.title", "posts.file", "users.name", "users.image")

        return res.json(posts)
    }
}

export default new PostController()