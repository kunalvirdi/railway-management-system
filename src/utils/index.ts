import {nanoid} from "nanoid";
import type {UserType} from "./types";
import jwt from "jsonwebtoken";

export function generateId():String{
    return nanoid();
}
const Token_Secret=process.env.TOKEN_SECRET || "";
export function generateAccessToken(user:UserType){
    return jwt.sign(user,Token_Secret)
}