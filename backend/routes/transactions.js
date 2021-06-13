const router = require("express").Router();
const Transaction = require("../models/transaction");

router.get("/", async (_req, res) => {
    const transactions = await Transaction.fetchAll({ withRelated: "categories" });

    formattedTransactions = transactions.map((transaction) => ({
        id: transaction.get("id"),
        name: transaction.get("name"),
        date: transaction.get("date"),
        total: transaction.related("categories").reduce((acc, category) => {
            return acc + category.pivot.get("amount");
        }, 0),
        categories: transaction.related("categories").reduce((acc, category) => {
            return { ...acc, [category.id]: category.pivot.get("amount") };
        }, {}),
    }));

    res.json(formattedTransactions);
});

router.post("/", (req, res) => {
    new Transaction({
        date: req.body.date,
        name: req.body.details,
        account_id: 1,
    })
        .save()
        .then((transaction) => {
            transaction.categories().attach(req.body.categories);
            res.json(transaction);
        });
});

module.exports = router;
