const JobData = require('../Model/Job');
const jobUtils = require('../Utils/jobUtils');
const ProfileData = require('../Model/Profile');

module.exports = {
    async index(request, response) {
        const profile = await ProfileData.get();
        const jobs = await JobData.get();
        const updatedJobs = jobs.map(job => {
            const remaining = jobUtils.remainingDay(job);
            const status = remaining <= 0 ? "done" : "progress";
            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
        const jobsDoneNumber = updatedJobs.reduce((doneNumber, job) => {
            if (job.remaining <= 0) {
                doneNumber++
            }
            return doneNumber;
        }, 0);
        const dailyHoursSum = updatedJobs.reduce((element, obj) => {
            if (obj.status === 'progress') {
                return element += obj['daily-hours'];
            };
            return element;
        },0)
        const freeTime = 24 - (dailyHoursSum + profile['daily-sleep']);
        return response.render("index", { jobs: updatedJobs, ProfileData: profile, utils: {jobsDoneNumber, freeTime} });
    },
};