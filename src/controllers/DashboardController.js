const JobData = require('../Model/Job');
const jobUtils = require('../Utils/jobUtils');
const ProfileData = require('../Model/Profile');

module.exports = {
    async index(request, response) {
        const jobs = await JobData.get();
        const profile = await ProfileData.get();

        const updatedJobs = jobs.map((job) => {
            const remaining = jobUtils.remainingDay(job);
            const status = remaining <= 0 ? "done" : "progress";
            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
        return response.render("index", { jobs: updatedJobs, ProfileData: profile });
    },
};