import {Sequelize} from "sequelize";
import type {DBType} from "../utils/types";

const database=process.env.DB_NAME || "railway_db";
const DBUser=process.env.DB_USERNAME || "root"
const DBPassword=process.env.DB_PASSWORD || "1234";

console.log("Only single time...")
function createConnection():Sequelize{
    return new Sequelize(database,DBUser,DBPassword,{
        host:"localhost",
        dialect:"mysql",
        define:{
            timestamps:false
        }
    })
}
const db=createConnection();

const DB:DBType={
    getDB() {
        return db;
    }
}

export default DB;