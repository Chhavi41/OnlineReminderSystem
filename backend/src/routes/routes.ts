import { Router } from "express";
import { registerUser, loginUser, getUser } from '../controllers/authController'
import { userAuth } from "../middlewares/auth";
import { createReminder, getReminders } from "../controllers/reminderController";
const router = Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me', userAuth, getUser);

router.use('/reminders', userAuth);
router.post('/reminders', createReminder);
router.get('/reminders', getReminders);

export default router;