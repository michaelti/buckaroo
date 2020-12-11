exports.up = function (knex) {
    return knex.schema.createTable("transactions", (table) => {
        table.increments("id");
        table
            .integer("account_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("accounts")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("name").notNullable();
        table.date("date").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("transactions");
};
