import express from "express";
import {loginController,registerController} from "../controller/auth.controller";
import {verify} from "../middlewares/verify.middleware";

const router=express.Router();

router.post("/login",verify,loginController)

router.post("/register",registerController)

export default router

