function validationSignup(req, res , next){
    const {name ,email, password, role} = req.body;
    if(!name){
        return res.status(400).json({error:"name is required"});
    }
    if(!password){
        return res.status(400).json({error:"password is required"});
    }
    if(!email){
        return res.status(400).json({error:"email is required"});
    }
     next();
}

module.exports = validationSignup;
