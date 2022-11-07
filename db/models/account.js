const { Model } = require("objection");

class Account extends Model {
    static get tableName() {
        return "accounts";
    }

    static get relationMappings() {
        const User = require("./user");
        const Transaction = require("./transaction");

        return {
            transactions: {
                relation: Model.HasManyRelation,
                modelClass: Transaction,
                join: {
                    from: "account.id",
                    to: "transactions.account_id",
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "accounts.user_id",
                    to: "users.id",
                },
            },
        };
    }
}

module.exports = Account;
