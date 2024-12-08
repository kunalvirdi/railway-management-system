import type { NextFunction, Request, Response } from "express";

const authorizeAdmin=(req:Request,res:Response,next:NextFunction)=>{
    if(req.body?.isAdmin){
        const ADMIN_API_KEY=process.env.ADMIN_API_KEY;
        try{
            const apiKeyHeader:String|any=req.headers['api-key']
            const apiKey=apiKeyHeader?.split(' ')[1];
            if(!apiKeyHeader){
                throw new Error("Unauthorized access")
            }
            else if(apiKey!==ADMIN_API_KEY){
                throw new Error('Invalid api key')
            }
            next()
        }catch(err:any){
            const error:{statusCode:number,message:String}={statusCode:401,message:err.message}
            next(error)
        }
    }else{
        next()
    }
}
export default authorizeAdmin;