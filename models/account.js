const bookshelf = require("../bookshelf");

const Account = bookshelf.model("Account", {
    tableName: "account",
});

module.exports = Account;
