import config from "dotenv"

config.config()

export const uri = process.env.URI
export const port = process.env.PORT
export const salt = process.env.SALT
export const secret = process.env.SECRET
