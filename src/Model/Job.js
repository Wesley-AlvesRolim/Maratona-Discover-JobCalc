let data = [{
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 6,
        "total-hours": 15,
        createdAt: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 40,
        createdAt: Date.now(),
    }
];
module.exports = {
    get() {
        return data;
    },
    update(newArray) {
        data = newArray;
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    },
    create(newJob) {
        data.push(newJob)
    }
}