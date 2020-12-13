const bookshelf = require("../bookshelf");
require("./account");
require("./category");

const User = bookshelf.model("User", {
    tableName: "users",
    accounts() {
        return this.hasMany("Account");
    },
    category() {
        return this.hasMany("Category");
    },
});

module.exports = User;
