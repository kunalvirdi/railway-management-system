import User from "./user.model";
import Password from "./password.model";

User.hasOne(Password,{
    onDelete:"SET NULL",
    foreignKey:{
        name:"userId",
        allowNull:false
    }
})
Password.belongsTo(User,{
    foreignKey:"userId"
})
await User.sync()
await Password.sync()
