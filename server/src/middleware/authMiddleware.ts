import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { jwtCustomPayload } from "../controllers/user.controllers.js";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = jwt.verify(token, process.env.JWT_SECRET!);
        // console.log(userId);
        // req.body.userId = userId?.id;
        (req as CustomRequest).token = userId;
        next();
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Some error",
        });
    }
};

export default authMiddleware;
