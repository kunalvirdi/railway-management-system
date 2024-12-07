import {Sequelize} from "sequelize";
import {z} from "zod";
import UserSchema from "../schemas/user.schema";

export interface DBType{
    db:Sequelize|null,
    getDB():Sequelize
}
export type ErrorType={

}
export type UserType=z.infer<typeof UserSchema>
