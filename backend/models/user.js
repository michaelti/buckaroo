const bookshelf = require("../bookshelf");
require("./account");
require("./category");
require("./transaction");

const User = bookshelf.model("User", {
    tableName: "users",
    accounts() {
        return this.hasMany("Account");
    },
    categories() {
        return this.hasMany("Category");
    },
    transactions() {
        return this.hasMany("Transaction").through("Account");
    },
});

module.exports = User;
