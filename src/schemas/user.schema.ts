import {z} from 'zod';

const roles=['admin','user']
const UserSchema = z.object({
    firstName:z.string().min(4).max(20),
    lastName:z.string().min(4).max(20),
    username:z.string().min(8),
    role:z.custom(role=>{
        return roles.includes(role.toLowerCase());
    },"Invalid input role. Select from [admin and user] only"),
    phone:z.string().min(10,"phone number incorrect").max(10,"phone number incorrect"),
    email:z.string().email(),
    password:z.string().min(8),
    confirmPassword:z.string().min(8),
}).refine(data=>data.password===data.confirmPassword,{
    message:"Passwords don't match",
})

export default UserSchema