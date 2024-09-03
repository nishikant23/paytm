const express  = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const app = express();

application.use(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            return res.redirect("http://localhost:5173/signup")
        }

        let decode;
        try{
            decode = jwt.verify(token, JWT_SECRET);
            if(!decode){
                return res.redirect("http://localhost:5173/signup");
            }
        }catch(err) {
            return res.redirect("http://localhost:5173/sigin");
        }
        const { username, password } = decode;
        const userExist = await User.findOne({
            username,
            password
        })

        if(!userExist) {
            return res.redirect("http://localhost:5173/signup");
        }
        res.redirect("http://localhost:5173/dashboard");
        next();
    } catch(err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});