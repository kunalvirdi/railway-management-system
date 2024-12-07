import type {Response} from "express";
import type {ResponseType} from "./types";

export const sendCreatedResponse=(
    response:ResponseType,res:Response
)=>{
    return res.status(201).json(response)
}

