import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {salt} from "../config/env.js"

const userSchema = new mongoose.Schema({
    "email": {type: String, unique: true},
    "password": String
})

userSchema.methods.hashPass = function() {
    this.password = bcrypt.hashSync(this.password, salt)
}

userSchema.methods.check = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema)

export { User }