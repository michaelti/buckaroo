const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");

router.get("/check", authenticate, (req, res) => {
    return res.json({ success: true, decoded: req.decoded });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    User.where({ email })
        .fetch()
        .then(async (user) => {
            const passwordMatch = await bcrypt.compare(password, user.attributes.password);

            if (!passwordMatch) throw new Error();

            const payload = {
                id: user.id,
                email: user.attributes.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            res.json({ success: true, token });
        })
        .catch(() => {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        });
});

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    new User({
        name,
        email,
        password: hashedPassword,
    })
        .save()
        .then((user) => {
            delete user.attributes.password;

            res.status(201).json({
                success: true,
                user,
            });
        })
        .catch(() => {
            res.status(500).json({ success: false, message: "Failed to sign up" });
        });
});

module.exports = router;
