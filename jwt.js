const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userData) => {
    return jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// JWT authentication middleware
const jwtAuthmiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        
        console.log("Authorization header:", req.headers.authorization);
        if (!authorization) {
            return res.status(401).json({
                error: "Token not found"
            });
        }

       const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
         return res.status(401).json({
         error: "Token not found"
        });
    }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {
        console.error(err);

        res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = {
    generateToken,
    jwtAuthmiddleware
};