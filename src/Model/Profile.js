let data = {
    name: "Wesley",
    avatar: "https://avatars.githubusercontent.com/u/78855198?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 6,
    "vacation-per-year": 4,
    "value-hour": 75
};
module.exports = {
    get(){
        return data;
    },
    update(object){
        data = object;
    }
}