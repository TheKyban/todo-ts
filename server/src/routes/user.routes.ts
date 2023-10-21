import express, { Router } from "express";
import userControllers from "../controllers/user.controllers.js";

const router: Router = express.Router();
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/logout", userControllers.logout);
export default router;
