const { faker } = require("@faker-js/faker");

const transactionsData = Array.from({ length: 20 }, (item, i) => ({
    id: i + 1,
    category_id: Math.floor(Math.random() * 3 + 1),
    account_id: Math.floor(Math.random() * 3 + 1),
    name: faker.company.companyName(),
    date: faker.date.recent(),
    amount: faker.finance.amount(0, 10000, 0),
}));

exports.seed = async function (knex) {
    await knex("transactions").del();
    await knex("transactions").insert(transactionsData);
};
