const { Model } = require("objection");

class User extends Model {
    static get tableName() {
        return "users";
    }

    static get relationMappings() {
        const Account = require("./account");
        const Transaction = require("./transaction");

        return {
            accounts: {
                relation: Model.HasManyRelation,
                modelClass: Account,
                join: {
                    from: "users.id",
                    to: "accounts.user_id",
                },
            },
            transactions: {
                relation: Model.ManyToManyRelation, // Necessary for "through"
                modelClass: Transaction,
                join: {
                    from: "users.id",
                    through: {
                        from: "accounts.user_id",
                        to: "accounts.id",
                    },
                    to: "transactions.account_id",
                },
            },
        };
    }
}

module.exports = User;
