import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
const secret = process.env.JWT_SECRET;

export const userAuth = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Token is invalid')
        }
        const decodeObj = jwt.verify(token, secret!)
        const {_id} = decodeObj as JwtPayload;
        const user = await User.findById(_id);
        if (!user) throw new Error('User not found: ');
        (req as any).user = user;
        next();
    } catch(err) {
        res.status(400).send('err: '+err)
    }
}