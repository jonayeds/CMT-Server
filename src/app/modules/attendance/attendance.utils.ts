import moment from "moment-timezone";


export const getTimeDifference = (updatedAt: Date, timeZone = 'Asia/Kolkata') => {
    const updatedDate = moment(updatedAt).tz(timeZone);
    const currentDate = moment().tz(timeZone);
    const differenceInHours = currentDate.diff(updatedDate, 'hours', true); // true gives fractional hours
    return differenceInHours;
};

export const isTimeBetween = (startTime: string, endTime: string) => {
    const now = moment().tz('Asia/Dhaka');
    const currentTime= now.hours() * 60 + now.minutes();
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const newStartTime = startHours * 60 + startMinutes;
    const newEndTime = endHours * 60 + endMinutes;
     return (currentTime >= newStartTime && currentTime <= newEndTime);
    
}

export const getClassStartedSince = (startTime: string) => {
    const now = moment().tz('Asia/Dhaka');
    const currentTime= now.hours() * 60 + now.minutes();
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const newStartTime = startHours * 60 + startMinutes;
    return currentTime - newStartTime;
}

