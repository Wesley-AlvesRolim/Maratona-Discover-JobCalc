const JobData = require('../Model/Job');
const jobUtils = require('../Utils/jobUtils');
const ProfileData = require('../Model/Profile');

module.exports = {
    async save(request, response) {
        const valuesInInputs = {
            name: request.body.name,
            "daily-hours": request.body["daily-hours"],
            "total-hours": request.body["total-hours"],
            createdAt: Date.now(),
        };
        await JobData.create(valuesInInputs);
        return response.redirect("/");
    },
    create(request, response) {
        return response.render(`job`);
    },
    async show(request, response) {
        const jobId = request.params.id;
        const profile = await ProfileData.get();
        const jobCatch = await JobData.get()
        const jobWanted = jobCatch.find(job => Number(job.id) === Number(jobId));
        if (!jobWanted) {
            return response.send('Job not found!');
        }
        jobWanted.budget = jobUtils.calculateBudget(jobWanted,  Number(profile["value-hour"]))
        return response.render(`job-edit`, { jobInHtml: jobWanted });
    },
    async update(request, response) {
        const jobId = request.params.id;
        const updatedJob = {
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"]
        }
        await JobData.update(updatedJob,jobId);
        return response.redirect(`/job/${jobId}`)
    },
    async delete(request, response) {
        const jobId = request.params.id;
        await JobData.delete(jobId);
        return response.redirect('/');
    }
}