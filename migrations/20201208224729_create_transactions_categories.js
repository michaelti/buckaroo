exports.up = function (knex) {
    return knex.schema.createTable("transactions_categories", (table) => {
        table.increments("id");
        table
            .integer("transaction_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("transactions")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("category_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("categories")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.integer("amount").notNullable().defaultTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("transactions_categories");
};
