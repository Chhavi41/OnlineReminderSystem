import mongoose from "mongoose";
import User from "./user";


const reminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    time: {
        type: Number,
        min: 0,
        max: 23 //hour of the day
    },
    schedule: {
        type: [Number],
        required: true,
        validate: {
            validator: function(this:any, value: number[]) {
                switch(this.frequency) {
                    case 'daily':
                        return value.every((v) => v>=0 && v<=23)
                    case 'weekly':
                        return value.every((v) => v>=0 && v<=6)
                    case 'monthly':
                        return value.every((v) => v>=1 && v<=31)
                    default:
                        return false;
                }
            },
            message: 'Invalid schedule values for selected frequency'
        }
    },
    frequency: {
        type: String,
        enum: {
          values: ["daily", "weekly", "monthly"], // allowed values
          message: "{VALUE} is not a valid frequency", // optional custom error
        },
        required: true,
    },
}, {
    timestamps: true
})

export const Reminder = mongoose.model("Reminder", reminderSchema);

