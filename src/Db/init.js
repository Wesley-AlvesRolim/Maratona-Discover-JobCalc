const DataBase = require('./config');
const initDb = {
    async init() {
        const db = await DataBase();
        await db.exec(`
            CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT
            )
        `);
        await db.exec(`
            CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                createdAt DATETIME
            )
        `);
        await db.run(`
            INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                value_hour
                ) VALUES(
                    "Wesley",
                    "https://avatars.githubusercontent.com/u/78855198?v=4",
                    3000,
                    5,
                    6,
                    4,
                    75
                )
            `);
        await db.run(`
            INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                createdAt
            ) VALUES(
                "Pizzaria Guloso",
                6,
                15,
                1617815112916
            )
        `);
        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                createdAt
                ) VALUES(
                    "OneTwo Project",
                    3,
                    40,
                    1617815112916
                )
        `);
        await db.close();
    }
}
initDb.init();