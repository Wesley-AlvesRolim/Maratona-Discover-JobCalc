const DataBase = require('../Db/config');

module.exports = {
    async get() {
        const db = await DataBase();
        const data = await db.get(`SELECT * FROM profile`);
        await db.close();
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },
    async update(object) {
        const db = await DataBase();
        db.run(`UPDATE profile SET
            name = "${object.name}",
            avatar = "${object.avatar}",
            monthly_budget = ${object["monthly-budget"]},
            days_per_week = ${object["days-per-week"]},
            hours_per_day = ${object["hours-per-day"]},
            vacation_per_year = ${object["vacation-per-year"]},
            value_hour = ${object["value-hour"]}
        `);
        await db.close();
    }
}