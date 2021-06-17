const bookshelf = require("../bookshelf");
require("./account");
require("./category");
require("./user");

const Transaction = bookshelf.model("Transaction", {
    tableName: "transactions",
    account() {
        return this.belongsTo("Account");
    },
    categories() {
        return this.belongsToMany("Category", "transactions_categories").withPivot(["amount"]);
    },
    user() {
        return this.belongsTo("User").through("Account");
    },
});

module.exports = Transaction;
