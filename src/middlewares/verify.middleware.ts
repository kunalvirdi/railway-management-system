import type {Request,NextFunction, Response} from "express";
import bcrypt from "bcryptjs";
import {Password, User} from "../models";

export const verify=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const reqToken=req.cookies['jsonwebtoken']
        if(reqToken){
            throw new Error('user already login. Please log out first and then try again!')
        }
        const body=req.body
        const dbRes=await User.findOne({
            where:{
                username:body.username
            },
            include:{
                model:Password,
                attributes:['hashedPassword']
            }
        })
        const user=dbRes?.toJSON();
        if(req.body?.isAdmin && user.role==='user'){
            throw new Error('Normal user trying to access admin role.')
        }

        if(!user){
            throw new Error("User not found");
        }
        const hashedPassword=user.password.hashedPassword;
        const isVerified=await bcrypt.compare(body.password,hashedPassword);
        if(!isVerified){
            throw new Error("Incorrect password");
        }

        const {userId,username,email,phone,role}=user;
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
        }else if(error.message==="Incorrect password"){
            err.statusCode=401
        }
        next(err)
    }
}