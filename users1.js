const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = new schema({
    name:{
        type:String,
        required:[true,"Name alanı zorunludur"],
        unique:[true,"Girdiğiniz isim kullanılmaktadır"],
        maxlength:[15,"Name 15 karakterden uzun olamaz"]
    }
    ,password:{
        type:String,
        required:[true,"Password alanı zorunludur"]
    }
    ,writings:[String]
})
module.exports = mongoose.model('users1',user);