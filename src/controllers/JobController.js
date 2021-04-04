const JobData = require('../Model/Job');
const jobUtils = require('../Utils/jobUtils');
const ProfileData = require('../Model/Profile');

module.exports = {
    index(request, response) {
        const updatesJobs = JobData.get().map(jobElement => {
            const remaining = jobUtils.remainingDay(jobElement)
            const status = remaining <= 0 ? 'done' : 'progress'
            return {
                ...jobElement,
                remaining,
                status,
                budget: jobUtils.calculateBudget(jobElement, ProfileData.get()["value-hour"])
            };
        });
        return response.render(`index`, { jobs: updatesJobs, ProfileData: ProfileData.get() });
    },
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
        JobDataCaught.push(valuesInInputs);
        return response.redirect("/");
    },
    create(request, response) {
        return response.render(`job`);
    },
    show(request, response) {
        const jobId = request.params.id;
        const jobWanted = JobData.get().find(job => Number(job.id) === Number(jobId));
        if (!jobWanted) {
            return response.send('Job not found!');
        }
        jobWanted.budget = jobUtils.calculateBudget(jobWanted, ProfileData.get()["value-hour"])
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
        JobData.update(JobData.get().filter(job => Number(job.id) !== Number(jobId)));
        return response.redirect('/');
    }
}