import type {ResponseType, Response, Request, NextFunction, UserType} from "../utils/types";
import {User, Password} from '../models';
import {UserSchema} from "../schemas/";
import {fromZodError} from "zod-validation-error";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {sendCreatedResponse} from "../utils/responses";
import {DB} from "../config";
import {ZodError} from "zod";
import {generateAccessToken} from "../utils";



export const loginController=async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user:UserType=req.user;
    const token=generateAccessToken(user)
    res.cookie('jsonwebtoken',token,{
        httpOnly: true
    })
    return res.status(202).json({
        status:"success",
        message:"login successfully",
        user
    })
}

export const registerController=async (req: Request, res: Response, next: NextFunction) => {
    const data =req.body
    const db=DB.getDB()
    const txn=await db.transaction()
    try{
        UserSchema.parse(data)
        const {firstName,lastName,username,role,phone,email}=data
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(data.password,salt)
        const newUser=await User.create({firstName,lastName,username,role,phone,email},{transaction:txn})
        await Password.create({username:username,hashedPassword},{transaction:txn})
        await txn.commit()
        console.log("Received Request->",newUser.dataValues, {password: hashedPassword})
        const response:ResponseType={
            status:"success",
            message:"user saved to database successfully",
            data:newUser
        }
        sendCreatedResponse(response,res)

    }catch (err:any){
        // @ts-ignore
        console.log(err)
        let error={
            message:"Internal error occured",
            statusCode:406
        };
        if(err.errors){
            error={
                message:err.errors[0].message,
                statusCode:406
            }
        }else if(err instanceof ZodError){
            const formattedError=fromZodError(err)
            error={
                message:formattedError.message,
                statusCode:406
            }
        }
        await txn.rollback()
        next(error)
    }

}