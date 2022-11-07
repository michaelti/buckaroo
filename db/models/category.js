const { Model } = require("objection");

class Category extends Model {
    static get tableName() {
        return "categories";
    }

    static get relationMappings() {
        const User = require("./user");

        return {
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

module.exports = Category;
