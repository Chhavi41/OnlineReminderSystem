import cron from 'node-cron';
import { Reminder } from "../models/reminders"
import { sendReminderEmail } from "../utils/email";


cron.schedule('27 * * * *',async () => {
    console.log('Running hourly reminder check');
    const now = new Date();
    const currenthour = now.getHours();
    const currentday = now.getDay();
    const currentDate = now.getDate();

    try {
        let count = 0;
        const reminders = await Reminder.find({
            $or: [
                { frequency: "daily", schedule: currenthour },
                { frequency: "weekly", schedule: currentday, time: currenthour },
                { frequency: "monthly", schedule: currentDate, time: currenthour }
            ]
        }).populate("user");

        for (const reminder of reminders) {
            const user = reminder.user as any;
            if (!user?.emailId) continue;

            await sendReminderEmail( user.emailId, `Reminder: ${reminder.title}`,`${reminder.description || "You have a reminder!"}`)
            count++;
            console.log(`Processed ${count} reminders`);

        }
    } catch(err) {
        console.error('Error in cron job: ', err);
    }

})


