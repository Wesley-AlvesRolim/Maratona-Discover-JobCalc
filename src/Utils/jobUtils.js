module.exports = {
    remainingDay(job) {
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(2);
        const date = new Date(job.createdAt);
        const dueDay = date.getDate() + Number(remainingDays);
        const dueDateInMs = date.setDate(dueDay)
        const timeDiffMs = dueDateInMs - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffMs / dayInMs)
        return dayDiff;
    },
    calculateBudget: (jobElement, valueHour) => Number(valueHour * jobElement["total-hours"])
}