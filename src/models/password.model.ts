import {DB} from '../config'
import {DataTypes, Model} from "sequelize";

const db=DB.getDB()
class Password extends Model {}

Password.init({
    hashedPassword:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize:db,
    modelName:"passwords"
})

export default Password;