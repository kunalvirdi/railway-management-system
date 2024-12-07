import {DB} from '../config'
import {DataTypes, Model} from "sequelize";
import {generateId} from "../utils";

const db=DB.getDB()


class User extends Model{
    declare userId:String
}

User.init({
    userId:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
},{
    sequelize:db,
    modelName:"users"
})

User.beforeSave(user=>{
    user.userId=generateId();
})
await User.sync()
export default User;