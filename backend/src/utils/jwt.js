const jwt = require("jsonwebtoken");

const issueJWT = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role || "admin"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

module.exports = {
    issueJWT
};