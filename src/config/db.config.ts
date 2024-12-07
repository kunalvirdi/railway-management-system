import {Sequelize} from "sequelize";
import type {DBType} from "../utils/types";

const database=process.env.DB_NAME || "railway_db";
const DBUser=process.env.DB_USERNAME || "root"
const DBPassword=process.env.DB_PASSWORD || "1234";


const DB:DBType={
    db:null,
    getDB() {
        if(this.db) return this.db;
        this.db=new Sequelize(database,DBUser,DBPassword,{
            host:"localhost",
            define:{
                timestamps:false
            },
            dialect:"mysql"
        })
        console.log("Created only 1 time")
        return this.db;
    }

}


export default DB;