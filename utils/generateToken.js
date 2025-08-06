const jwt = require("jsonwebtoken");
const superKey = "Hellow123455@#$";
function generateToken(user){
     const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role : user.role,
        isverified: user.isVerified,
     },superKey,{
        expiresIn:"1h",
    });
    return token;
};

module.exports = generateToken;
