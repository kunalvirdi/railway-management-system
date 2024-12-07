import {Sequelize} from "sequelize";
import {z} from "zod";
import UserSchema from "../schemas/user.schema";

export interface DBType{
    db:Sequelize|null,
    getDB():Sequelize
}

export type ResponseType={
    status:string,
    message:string,
    data:object | null
}

export type UserType=z.infer<typeof UserSchema>
