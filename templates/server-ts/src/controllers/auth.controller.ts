import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response): Promise<any> => {
	const { email, password, name } = req.body;
	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hashedPassword,
			name,
		});

		await user.save();

		generateTokenAndSetCookie(res, user._id.toString());

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user.toObject(),
				password: undefined,
			},
		});
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const login = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password as string);

		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id.toString());

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user.toObject(),
				password: undefined,
			},
		});
	} catch (error: any) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error: any) {
        console.log("Error in checkAuth ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};
