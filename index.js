require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const transactionsRoutes = require("./routes/transactions");

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionsRoutes);

app.listen(PORT, () => {
    console.log("Listening on " + PORT);
});
