import type {NextFunction, Request, Response} from 'express';
import User from "../models/user.model";
import UserSchema from "../schemas/user.schema";
import {fromZodError} from "zod-validation-error";
import bcrypt from 'bcryptjs'
import {sendCreatedResponse} from "../utils/responses";
import type {ResponseType} from "../utils/types";

export const loginController=(req: Request, res: Response, next: NextFunction) => {

}

export const registerController=async (req: Request, res: Response, next: NextFunction) => {
    const data =req.body

    try{
        UserSchema.parse(data)
        const {firstName,lastName,username,role,phone,email}=data
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(data.password,salt)
        const newUser=await User.create({firstName,lastName,username,role,phone,email})
        console.log("Received Request->",newUser.dataValues, {password: hashedPassword})

        const response:ResponseType={
            status:"success",
            message:"user saved to database successfully",
            data:newUser
        }
        return sendCreatedResponse(response,res)

    }catch (err:any){
        // @ts-ignore
        let error;
        if(err.errors){
            error={
                message:err.errors[0].message,
                statusCode:406
            }
        }else{
            const formattedError=fromZodError(err)
            error={
                message:formattedError.message,
                statusCode:406
            }
        }
        next(error)
    }
}