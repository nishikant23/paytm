const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(404).json({});
    }
    const token = authHeader.split(' ')[1] //to remove intial 'Bearer' word from token
    
    try { //try to decode the token
        const decode = jwt.verify(token, JWT_SECRET); //decode the token(actually = userID)
        req.userId = decode.userId; //if user from DB, req.userId =must= decoded-userID
        next(); //then authentication succecfull, that its a valid already existed in DB, user let him in the app.
    }
    catch(err) { //if not decoded then catch error and throw error
        return res.status(404).json({});
    }
}

module.exports = {
    authMiddleware
}