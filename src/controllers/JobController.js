const JobData = require('../Model/Job');
const jobUtils = require('../Utils/jobUtils');
const ProfileData = require('../Model/Profile');

module.exports = {
    save(request, response) {
        const JobDataCaught = JobData.get();
        const id = JobDataCaught[JobDataCaught.length - 1].id + 1 || 1;
        const valuesInInputs = {
            id: id,
            name: request.body.name,
            "daily-hours": request.body["daily-hours"],
            "total-hours": request.body["total-hours"],
            createdAt: Date.now(),
        };
        JobData.create(valuesInInputs);
        return response.redirect("/");
    },
    create(request, response) {
        return response.render(`job`);
    },
    async show(request, response) {
        const jobId = request.params.id;
        const jobWanted = JobData.get().find(job => Number(job.id) === Number(jobId));
        if (!jobWanted) {
            return response.send('Job not found!');
        }
        jobWanted.budget = jobUtils.calculateBudget(jobWanted,  await ProfileData.get()["value-hour"])
        return response.render(`job-edit`, { jobInHtml: jobWanted });
    },
    update(request, response) {
        const jobId = request.params.id;
        const jobWanted = JobData.get().find(job => Number(job.id) === Number(jobId));
        if (!jobWanted) {
            return response.send('Job not found!');
        }
        const updatedJob = {
            ...jobWanted,
            name: request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"]
        }
        JobData.update(
            JobData.get().map(
                job => {
                    if (Number(job.id) === Number(jobId)) {
                        job = updatedJob
                    }
                    return job
                }));
        return response.redirect(`/job/${jobId}`)
    },
    delete(request, response) {
        const jobId = request.params.id;
        JobData.delete(jobId);
        return response.redirect('/');
    }
}