import { Request, Response } from "express";
import { validateReminder } from "../utils/validation";
import { Reminder } from "../models/reminders";

export const createReminder = async (req:Request, res:Response) => {
    try {
        const { title, description, time, schedule, frequency } = req.body;
        console.log(title, description, time, schedule, frequency)
        validateReminder(req);
        const reminder = new Reminder({
            title, description, time, schedule, frequency, user:(req as any).user?._id
        });
        const reminderSaved = await reminder.save();
        res.status(201).json({
            message: "Reminder added successfully",
            data: reminderSaved,
        });    
    } catch(err) {
        res.status(400).send('Error Occured: '+err)
    }
}

export const getReminders = async (req:Request, res:Response) => {
    try {
        const user = (req as any).user;
        if (!user?._id) {
            return res.status(401).json({ message: "Not authenticated" });
        }
      
        const reminders = await Reminder.find({user: user?._id}).sort({createdAt: -1});
        res.status(200).json({message: 'Reminders fetched successfully', data: reminders})
    } catch(err) {
        res.status(400).json({ message: "Error occurred while fetching reminders"+err });
    }
}