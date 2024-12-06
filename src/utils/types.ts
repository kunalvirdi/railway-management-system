import {Sequelize} from "sequelize";

export interface DBType{
    db:Sequelize|null,
    getDB():Sequelize
}