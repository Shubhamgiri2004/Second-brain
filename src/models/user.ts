import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { string } from "zod";

interface User {
    username : "string",
    password : "string"
}

interface UserMethod {
    generateAuthTokens(): "string",
    matchPassword(password : string) : Promise<Boolean>
}

interface UserModelType extends Model<User, {}, UserMethod>{
    hashPassword(password : string) : Promise<String>
}

//Making a userSchema
const userSchema  = new mongoose.Schema<User, UserMethod, UserModelType>({
    username: {
        type : string,
        required: true,
        unique: true,
        minLength: [3, "Minimum length of the username should be 3"]
        

    }
})



