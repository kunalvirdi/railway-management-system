import User from "./user.model";
import Password from "./password.model";

User.hasOne(Password,{
    onDelete:"CASCADE",
    foreignKey:{
        name:"username",
        allowNull:false
    }
})
Password.belongsTo(User,{
    foreignKey:"username"
})
await User.sync()
await Password.sync()
