import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/User";

declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		req.user = user;

		next();
	} catch (error: any) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
