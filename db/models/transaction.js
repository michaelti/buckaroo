const { Model } = require("objection");

class Transaction extends Model {
    static get tableName() {
        return "transactions";
    }

    static get relationMappings() {
        const Account = require("./account");
        const User = require("./user");
        const Category = require("./category");

        return {
            category: {
                relation: Model.HasOneRelation,
                modelClass: Category,
                join: {
                    from: "transactions.category_id",
                    to: "categories.id",
                },
            },
            account: {
                relation: Model.BelongsToOneRelation,
                modelClass: Account,
                join: {
                    from: "transactions.account_id",
                    to: "accounts.id",
                },
            },
            user: {
                relation: Model.ManyToManyRelation, // Necessary for "through"
                modelClass: User,
                join: {
                    from: "transactions.account_id",
                    through: {
                        from: "accounts.id",
                        to: "accounts.user_id",
                    },
                    to: "users.id",
                },
            },
        };
    }
}

module.exports = Transaction;
