const bookshelf = require("../bookshelf");
require("./user");
require("./transaction");

const Account = bookshelf.model("Account", {
    tableName: "accounts",
    user() {
        return this.belongsTo("User");
    },
    transactions() {
        return this.hasMany("Transaction");
    },
});

module.exports = Account;
