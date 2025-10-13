import type { NextFunction, Request, Response } from "express";
import { statusCodes } from "../constants/statusCodes";
import { config } from "../config";
import UserModel from "../models/user";
import jwt, {type JwtPayload } from "jsonwebtoken";


interface customPayload extends JwtPayload{
    _id : string;
}

declare global{
    namespace Express {
        interface Request {
            userId? : string;
        }
    }
}

export const auth = async (req: Request, res : Response, next: NextFunction)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(statusCodes.NotFound).json({
                msg: "No token Provided"
            });
        }
        const token = authHeader?.split(" ")[1];
        const decode = jwt.verify(token as string, config.JWT_SECRET) as customPayload;
        const user = await UserModel.findById(decode._id);
        if(!user){
            return res.status(statusCodes.NotFound).json({
                message: "User not found"
            });
        }
        req.userId = user._id.toString();
        next();
    } catch (error) {
        res.status(statusCodes.ServerError).json({
            msg : "Internal server error"
        })
    }
    
}