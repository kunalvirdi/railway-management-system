import express from "express";
import {loginController, logoutController, registerController} from "../controller/auth.controller";
import {verify} from "../middlewares/verify.middleware";
import authorizeAdmin from "../middlewares/admin-auth.middleware";

const router=express.Router();

router.post("/login",authorizeAdmin,verify,loginController)

router.post("/register",authorizeAdmin,registerController)

router.get('/logout',logoutController)

export default router

