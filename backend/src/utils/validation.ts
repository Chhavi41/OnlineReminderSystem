import validator from 'validator';
import { Request } from 'express';

export const validateSignUpData = (req:Request) => {
    const {firstName, lastName, emailId, password} = req.body;
    console.log(req.body)
    if (!firstName || !lastName)
        throw new Error('Invalid Name');
    else if (!emailId || !validator.isEmail(emailId)) 
        throw new Error('Invalid EmailId')
    else if (!password || !validator.isStrongPassword(password)) 
        throw new Error('Please Enter a strong password');
}

export const validateReminder = (req:Request) => {
    const { title, description, time, schedule, frequency } = req.body;
    if (!title) throw new Error('Invalid Title');
    else if (!frequency || ['daily', 'weekly', 'monthly'].indexOf(frequency) === -1) throw new Error('Invalid Frequency');
    else if (!schedule) throw new Error('Invalid Schedule');
    else if ((schedule === 'weekly' || schedule === 'monthly') && !time) throw new Error("Invalid time for reminder");
}