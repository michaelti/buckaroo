require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const authRoutes = require("./routes/auth");
const transactionsRoutes = require("./routes/transactions");
const authenticate = require("./middleware/authenticate");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/transactions", authenticate, transactionsRoutes);

app.listen(PORT, () => {
    console.log("Listening on " + PORT);
});
