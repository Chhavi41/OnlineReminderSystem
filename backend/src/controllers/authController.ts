import { Request, Response } from "express";
import { validateSignUpData } from "../utils/validation"
import User from "../models/user";

export const registerUser = async (req:Request, res:Response) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const user = new User({
            firstName, lastName, emailId, password
        })
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
        res.json({message: "User added successfully", data: savedUser})    
    } catch(err) {
        res.status(400).send('err: '+ err)
    }
}


export const loginUser = async (req:Request, res: Response) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId}).select("+password");
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isPasswordValid = await user.verifyPassword(password)
        const token = await user.getJWT();
        if (isPasswordValid) {
            res.cookie("token", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
            const userObj = user.toObject();
            const { password: _, ...safeUser } = userObj;
            res.json({message: "Login successful", data:safeUser});
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch(err) {
        res.status(400).send('error: ' + err)
    }
}

export const getUser =async (req:Request, res:Response) => {
    const user = (req as any).user;
    if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const userObj = user.toObject ? user.toObject() : { ...user };
    const { password, ...safeUser } = userObj;
  
    res.status(200).json({ user: safeUser });
}