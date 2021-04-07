const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const opening = {
    filename: 'database.sqlite',
    driver: sqlite3.Database
};
module.exports = () => open(opening);