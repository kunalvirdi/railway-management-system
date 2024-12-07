import type {NextFunction, Request, Response} from 'express';
import User from "../models/user.model";
import UserSchema from "../schemas/user.schema";
import {fromZodError} from "zod-validation-error";

export const loginController=(req: Request, res: Response, next: NextFunction) => {

}

export const registerController=async (req: Request, res: Response, next: NextFunction) => {
    const data =req.body

    // const newUser=await User.create({firstName,lastName,username,role,phone,email})
    try{
        UserSchema.parse(data)
    }catch (err){
        // @ts-ignore
        const formattedError=fromZodError(err)
        const error={
            message:formattedError.message,
            statusCode:406
        }
        next(error)
    }
    // res.status(201).json({
    //     status:"success",
    //     message:"user saved to database successfully",
    //     data:newUser,
    // })
}