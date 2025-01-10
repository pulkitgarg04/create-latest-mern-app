import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - Invalid Token' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, username: true },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log('Error in auth middleware: ', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};