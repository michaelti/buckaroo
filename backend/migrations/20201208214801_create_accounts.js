exports.up = function (knex) {
    return knex.schema.createTable("accounts", (table) => {
        table.increments("id");
        table
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("name").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("accounts");
};
