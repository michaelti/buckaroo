const bookshelf = require("../bookshelf");

const Account = bookshelf.model("Account", {
    tableName: "accounts",
});

module.exports = Account;
