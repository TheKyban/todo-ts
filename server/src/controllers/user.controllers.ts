import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma, { User } from "../models/index.js";
import jwt from "jsonwebtoken";

class UserControllers {
    async register(req: Request, res: Response) {
        try {
            const {
                name,
                email,
                password,
            }: { name: string; email: string; password: string } = req.body;

            /**
             * check all fields are given
             */
            if (!name || !email || !password) {
                return res.status(201).json({
                    success: false,
                    message: "Missing required fields",
                });
            }

            /**
             * Check user exists
             */
            const isExist = await prisma.user.findUnique({ where: { email } });
            if (isExist) {
                return res.status(201).json({
                    success: false,
                    message: "User already exists",
                });
            }

            /**
             * Hash the password
             */
            const Hashed_Password = await bcryptjs.hash(password, 8);

            /**
             * Create user
             */
            const User_Created = await User.create({
                data: { name, email, password: Hashed_Password },
            });

            return res.status(201).json({
                success: true,
                message: "User Created Successfully",
                user: User_Created,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
    async login(req: Request, res: Response) {
        try {
            const { email, password }: { email: string; password: string } =
                req.body;

            /**
             * check all fields are given
             */
            if (!email || !password) {
                return res.status(201).json({
                    success: false,
                    message: "Missing required fields",
                });
            }

            /**
             * check user exists
             */

            const User_Exists = await prisma.user.findUnique({
                where: { email },
            });

            if (!User_Exists) {
                return res.json({
                    success: false,
                    message: "User Not Found",
                });
            }

            /**
             * Compare password
             */

            const isMatch = await bcryptjs.compare(
                password,
                User_Exists.password
            );

            if (!isMatch) {
                return res.json({
                    success: false,
                    message: "Invalid Password",
                });
            }

            /**
             * Create jwt token
             */

            const token = jwt.sign(
                { id: User_Exists.id },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "30d",
                }
            );

            /**
             * Set cookie
             */

            res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30days
                maxAge: Date.now() + 1000 * 60 * 60 * 24 * 30,
                secure: process.env.NODE_ENV === "production" ? true : false,
            });

            /**
             * Send Response
             */

            return res.json({
                success: true,
                message: "User Logged In Successfully",
                user: User_Exists,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
    logout(req: Request, res: Response) {
        try {
            return res
                .cookie("token", "", {
                    httpOnly: true,
                    secure:
                        process.env.NODE_ENV === "production" ? true : false,
                    expires: new Date(Date.now()),
                    maxAge: 0,
                })
                .send();
        } catch (error) {}
    }
}

export default new UserControllers();
