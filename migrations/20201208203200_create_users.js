exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("email").unique().notNullable();
        table.string("name").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
