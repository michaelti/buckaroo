const data = [
    { id: 1, user_id: 1, name: "Groceries" },
    { id: 2, user_id: 1, name: "Travel" },
    { id: 3, user_id: 1, name: "Tech" },
];

exports.seed = async function (knex) {
    await knex("categories").del();
    await knex("categories").insert(data);
};
