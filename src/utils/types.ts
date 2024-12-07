import {Sequelize} from "sequelize";
import {z} from "zod";
import UserSchema from "../schemas/user.schema";
import type {NextFunction, Request, Response} from 'express';

export type {Response,NextFunction,Request}


export interface DBType{
    getDB():Sequelize
}

export type ResponseType={
    status:string,
    message:string,
    data:object | null
}

export type UserType={
    userId:String,
    username:String,
    role:String,
    phone:String,
    email:String
}
