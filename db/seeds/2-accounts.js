const accountsData = [
    { id: 1, user_id: 1, name: "Chequing" },
    { id: 2, user_id: 1, name: "Savings" },
    { id: 3, user_id: 1, name: "Investing" },
];

exports.seed = async function (knex) {
    await knex("accounts").del();
    await knex("accounts").insert(accountsData);
};
