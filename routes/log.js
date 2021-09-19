const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../users1');
const jwt = require('jsonwebtoken');
const {check} = require('../routes/auth');
require('dotenv').config();
router.get("/",check,(req,res)=>{
res.render('index.ejs');
});
router.get("/sign-up",(req,res)=>{
res.render("sign-up.ejs");
});
router.get("/login",(req,res)=>{
    res.render("login.ejs");
    });
router.post("/sign-up",async(req,res)=>{
const user = new User(req.body)
try{
await user.save()
let token = jwt.sign({name:req.body.name},process.env.SECRET_TOKEN,{expiresIn : 120})
res.cookie('jwt',token,{httpOnly :true,maxAge : 120000})
res.render("homepage.ejs")
}
catch(e){
    res.send(e);
}

});

router.post("/login",async(req,res)=>{
const ad = req.body.name;
let find = await User.find({name:ad})
if(find.length == 0){
    res.render("login.ejs");
}
else{
    const maxage = 2*60;
    const token = await jwt.sign({
        name:req.body.name
    },process.env.SECRET_TOKEN,{
        expiresIn:maxage
    });
    res.cookie("jwt",token,{httpOnly:true,maxAge:maxage*1000});
    res.redirect("/homepage");
}
router.get("/homepage",async(req,res)=>{
    let kontrol = req.cookies.jwt;
    let gonder = jwt.verify(kontrol,process.env.SECRET_TOKEN);
    res.render("homepage.ejs",{gonder})
});
});









module.exports = router