import type { NextFunction, Request, Response } from "express";
import { statusCodes } from "../constants/statusCodes";
import { config } from "process";
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

export const auth = async (req: Request, res : Response)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            res.status(statusCodes.NotFound).json({
                msg: "No token Provided"
            })
        }
        const token = authHeader?.split(" ")[1];
        const decode = jwt.verify(token as string, config.JWT_SECRET) as customPayload
    }
    
}