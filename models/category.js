const bookshelf = require("../bookshelf");
require("./user");
require("./transaction");

const Category = bookshelf.model("Category", {
    tableName: "categories",
    user() {
        return this.belongsTo("User");
    },
    transactions() {
        return this.belongsToMany("Transaction", "transactions_categories");
    },
});

module.exports = Category;
