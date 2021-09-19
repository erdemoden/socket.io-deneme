const jwt = require('jsonwebtoken');
const check = function(req,res,next){
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,(err,dtoken)=>{
            if(err){
                console.log("hata oldu");
                next();
            }
            else{
                console.log("homepage çalışacak")
                res.redirect("/homepage");
            }
        });
    }
    else{
        console.log("token yok")
        next()
    }
}
module.exports = { check };