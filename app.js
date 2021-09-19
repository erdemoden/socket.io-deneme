const express = require('express')
const app = express()
const log = require('./routes/log.js')
const db = require('./db')();
const http = require("http");
const cookieparser = require('cookie-parser');
const server = http.createServer(app)
const socketio = require("socket.io");
const io = socketio(server);
server.listen(process.env.PORT||1998)

app.set('view-engine','ejs');
// app.get('/',(req,res)=>{
//     res.render("index.ejs")
// })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use('/',log);
let howmuch = 0;
let positions = [];
let objects = [];
let ids = [];
io.on('connection',(socket)=>{
    socket.join(1998);
    //  if(ids[howmuch]!=socket.id){
    //     howmuch++;
    //  }
    console.log(ids.length);
    ids.push(socket.id);
    io.emit('Create',howmuch,positions,objects,ids);
    socket.emit("Self1",howmuch,socket.id);
    socket.on("ButtonOnePressed",(but,which,posxx,posyy)=>{
        positions[which] = {
            posx:posxx,
            posy:posyy
        };
       socket.broadcast.to(1998).emit("ButtonPressed",but,which,positions,socket.id)
        });
    socket.on("Updatepos",(posxx,posyy,i)=>{
        positions[i] = {
            posx:posxx,
            posy:posyy
        };
        objects[i] = true
    });
console.log("Bağlandık")
socket.on('disconnect',()=>{
    if(ids.includes(socket.id)){
        let index = ids.indexOf(socket.id)
        ids.splice(index,1);
        howmuch--;
    }
    socket.to(1998).emit("DeleteUser",socket.id);
})
});