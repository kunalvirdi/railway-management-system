import type {Request,NextFunction, Response} from "express";
import bcrypt from "bcryptjs";
import {Password, User} from "../models";
import type {UserType} from "../utils/types";

export const verify=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const body=req.body
        const details=await Password.findOne({
            where:{
                username:body.username
            }
        })
        if(!details){
            throw new Error("User not found");
        }
        const userCredentials=details.dataValues;
        const isVerified=await bcrypt.compare(body.password,userCredentials.hashedPassword);
        if(!isVerified){
            throw new Error("User verification failed");
        }
        const userDetails=await User.findOne({
            where:{
                username:body.username
            }
        })
        const {userId,username,email,phone,role}=userDetails?.dataValues
        // @ts-ignore
        req.user={userId,username,email,phone,role};
        next()
    }catch(error:any){
        let err={
            statusCode:400,
            message:error.message
        }
        if(error.message==='User not found'){
            err.statusCode=404
        }else{
            err.statusCode=401
        }
        next(err)
    }
}