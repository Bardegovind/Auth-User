const jwt = require("jsonwebtoken");
const superKey = "Hellow123455@#$";
function authProtecter(req, res, next){
     const token = req.cookies.token;
         console.log(req.cookies);
     if(!token){
        return res.status(401).json({message: "Unauthorized: No token provided"});
     }
     try {
        const decoded = jwt.verify(token , superKey);
        req.user = decoded;
        next();
     } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
     }
};

 module.exports = authProtecter;