const bookshelf = require("../bookshelf");
require("./account");
require("./category");

const Transaction = bookshelf.model("Transaction", {
    tableName: "transactions",
    account() {
        return this.belongsTo("Account");
    },
    categories() {
        return this.belongsToMany("Category", "transactions_categories").withPivot(["amount"]);
    },
});

module.exports = Transaction;
