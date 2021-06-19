const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const accounts = await new User({ id: req.decoded.id })
        .accounts()
        .fetch({ withRelated: "transactions.categories" });

    const formatted = accounts.map((account) => {
        const categories = account.related("transactions").reduce((acc, curr) => {
            const obj = { ...acc };

            curr.related("categories").forEach((category) => {
                if (!(category.id in obj)) obj[category.id] = 0;
                obj[category.id] += category.pivot.get("amount");
            });

            return obj;
        }, {});

        return {
            id: account.id,
            name: account.attributes.name,
            categories,
        };
    });

    res.json(formatted);
});

module.exports = router;
