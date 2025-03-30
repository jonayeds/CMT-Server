import cron from "node-cron";
import { Chat } from "./chat.model";

const activeChatCronJobs: { [key: string]: cron.ScheduledTask } = {};

export const openChatSchedule = (chatId: string, schedule: Date) => {

  const cronExpression = `${schedule.getMinutes()} ${schedule.getHours()} ${schedule.getDate()} ${schedule.getMonth()+1} *`;
  console.log(cronExpression);
  console.log("Local time :", schedule.toString());

  if (activeChatCronJobs[chatId]) {
    console.log(`🛑 Stopping previous job for class ${chatId}`);
    activeChatCronJobs[chatId].stop();
    delete activeChatCronJobs[chatId];
  }

  const newJob = cron.schedule(cronExpression, async() => {
    console.log("Running job")
    try {
      const result = await Chat.findByIdAndUpdate(chatId, { isActive: true });
      if (result) {
        console.log(`Chat is Active now, this one ${chatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  });
  activeChatCronJobs[chatId] = newJob;
  console.log(`new job scheduled for chat ${chatId}`);
};
