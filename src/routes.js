import { Router } from "express"

import multer from "multer"
import multerImageConfig from "./config/multerImages"
import multerAudioConfig from "./config/multerAudio"

import UserController from "./Controllers/UserController"
import SessionController from "./Controllers/SessionController"
import PostController from "./Controllers/PostController"

import auth from "./middlewares/auth"

const image = multer(multerImageConfig)
const audio = multer(multerAudioConfig)

const routes = Router()

routes.post("/users", UserController.store)

routes.post("/session", SessionController.store)

routes.use(auth)

routes.get("/users/:id", UserController.list)

routes.put("/users", image.single("image"), UserController.update)

routes.post("/post", audio.single("file"), PostController.create)

routes.get("/post", PostController.list)


export default routes