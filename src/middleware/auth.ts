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