import multer from "multer"
import { resolve } from "path"
import crypto from "crypto" 

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "uploads", "audio"),
        filename(req, file, cb){
            const hash = crypto.randomBytes(8).toString("hex")

            const filename = `${hash}-${file.originalname}`

            cb(null, filename)
        }
    })
}