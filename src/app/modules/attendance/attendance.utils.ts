export const getTimeDifference = (startTime: string, updatedAt: Date) => {
    const updatedDate = new Date(updatedAt); // Convert MongoDB timestamp to Date object
    const currentDate = new Date(); // Get current time
    const differenceInMs = currentDate.getTime() - updatedDate.getTime(); // Difference in milliseconds
    const differenceInHours = differenceInMs / (1000 * 60 * 60); // Convert ms to hours
    
    return differenceInHours;
};

export const isTimeBetween = (startTime: string, endTime: string) => {
    const now = new Date(); 
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const newStartTime = startHours * 60 + startMinutes;
    const newEndTime = endHours * 60 + endMinutes;
     console.log(newStartTime,newEndTime, currentTime)
     return (currentTime >= newStartTime && currentTime <= newEndTime);
    
}
