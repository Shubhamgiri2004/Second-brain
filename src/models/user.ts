import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config, string } from "zod";
import config form "../"


interface User {
    username : string,
    password : string
}

interface UserMethod {
    generateAuthTokens(): string,
    matchPassword(password : string) : Promise<Boolean>
}

interface UserModelType extends Model<User, {}, UserMethod>{
    hashPassword(password : string) : Promise<String>
}

//Making a userSchema
const userSchema  = new mongoose.Schema<User, UserMethod, UserModelType>({
    username: {
        type : String,
        required: true,
        unique: true,
        minLength: [3, "Minimum length of the username should be 3"],
        maxLength: [12, "Maximum length of the username cannot exceed 12"]
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false,
        minLength: [6, "Minimum length of the password should be 6"],
        maxLength: [12, "Maximum  length of the password cannot exceed 12"]
    }
})

userSchema.methods.generateAuthTokens = function () {
    return jwt.sign({_id : this._id},config.JWT_SECRET);
}

