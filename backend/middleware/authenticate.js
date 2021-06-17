const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Authorization header required" });
    }

    const token = authorization.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: "Bearer token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Invalid bearer token" });
        }

        req.decoded = decoded;

        next();
    });
};
