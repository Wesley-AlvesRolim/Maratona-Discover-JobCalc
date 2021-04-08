const DataBase = require('../Db/config');

module.exports = {
    async get() {
        const db = await DataBase();
        const data = await db.all(`SELECT * FROM jobs`);
        await db.close();
        const dataMod = data.map(
            job => {
            return {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                createdAt: job.createdAt
            }
        })
        return dataMod;
    },
    async update(updatedJob, jobId) {
        const db = await DataBase();
        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)
        await db.close();
    },
    async delete(id) {
        const db = await DataBase();
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)
        await db.close();
    },
    async create(newJob) {
        const db = await DataBase();
        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            createdAt
            )VALUES(
                "${newJob.name}",
                ${newJob["daily-hours"]},
                ${newJob["total-hours"]},
                ${newJob.createdAt}
                )
        `);
        await db.close();
    }
}