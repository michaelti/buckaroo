const usersData = require("../seed_data/users");
const accountsData = require("../seed_data/accounts");
const categoriesData = require("../seed_data/categories");
const transactionsData = require("../seed_data/transactions");
const transactionsCategoriesData = require("../seed_data/transactions_categories");

exports.seed = async function (knex) {
    await knex("users").del();

    await knex("users").insert(usersData);
    await knex("accounts").insert(accountsData);
    await knex("categories").insert(categoriesData);
    await knex("transactions").insert(transactionsData);
    await knex("transactions_categories").insert(transactionsCategoriesData);
};
