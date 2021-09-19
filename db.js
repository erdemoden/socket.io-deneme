const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect("mongodb+srv://erdemoden:elmayiyen5@movie-api.icdyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    mongoose.connection.on("open",()=>{
        console.log("Mongodb connected")
    });
    mongoose.connection.on("error",()=>{
        console.log("Error")
    });
    mongoose.Promise = global.Promise;
}