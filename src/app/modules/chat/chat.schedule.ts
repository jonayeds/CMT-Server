import cron from "node-cron";
import { Chat } from "./chat.model";

const activeChatCronJobs: { [key: string]: cron.ScheduledTask } = {};
const closeChatCronJobs: {[key:string]:cron.ScheduledTask} ={}

export const openChatSchedule = (chatId: string, schedule: Date) => {

  const cronExpression = `${schedule.getMinutes()} ${schedule.getHours()} ${schedule.getDate()} ${schedule.getMonth()+1} *`;
  console.log(cronExpression);

  if (activeChatCronJobs[chatId]) {
    console.log(`🛑 Stopping previous job for class ${chatId}`);
    activeChatCronJobs[chatId].stop();
    delete activeChatCronJobs[chatId];
  }

  const newJob = cron.schedule(cronExpression, async() => {
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


export const closeChatSchedule = (chatId: string, schedule: Date) => {
  schedule.setMinutes(schedule.getMinutes() + 3)

  const cronExpression = `${schedule.getMinutes()} ${schedule.getHours()} ${schedule.getDate()} ${schedule.getMonth()+1} *`;
  console.log(cronExpression);

  if (closeChatCronJobs[chatId]) {
    console.log(`🛑 Stopping previous job for class ${chatId}`);
    closeChatCronJobs[chatId].stop();
    delete closeChatCronJobs[chatId];
  }

  const newJob = cron.schedule(cronExpression, async() => {
    try {
      const result = await Chat.findByIdAndUpdate(chatId, { isActive: false });
      if (result) {
        console.log(`Chat is Closed now, this one ${chatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  });
  closeChatCronJobs[chatId] = newJob;
  console.log(`new job scheduled for chat ${chatId}`);
};
