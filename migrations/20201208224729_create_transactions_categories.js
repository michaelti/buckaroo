exports.up = function (knex) {
    return knex.schema.createTable("transactions_categories", (table) => {
        table.increments("id");
        table
            .integer("transaction_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("transactions");
        table
            .integer("category_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("categories");
        table.integer("amount").notNullable().defaultTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("transactions_categories");
};
