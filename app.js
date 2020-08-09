const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
// const Balancer = require("./logic/balancer");
const path = require('path');
const GameServer = require("./logic/server-game");
const Balancer = require("./logic/balancer");
const cookieParser = require("cookie-parser");
const { request } = require("http");

const app = express();

const host = '0.0.0.0';
const port = 7000;

var sessionMiddleware = session({
    secret: "secret"
});

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(sessionMiddleware);

var gameServer = new GameServer();
var balancer = new Balancer();
// var ballancer = new Balancer(userHandler, gameHandler);
// ballancerCycle = () => {
//     setTimeout(function() {
//         ballancer.run();
//         ballancerCycle();
//     }, 1000);
// }
// ballancerCycle();



app.post("/login", (req, res) => {
    if (req.body.username) {
        let newUserName = req.body.username;
        req.session.username = newUserName;
        console.log("Register user: ", newUserName);
        gameServer.addPlayer(req.sessionID, newUserName);
        res.redirect("/play");
    }
});

app.get("/play", (req, res) => {
    let name = "";
    if (gameServer.hasplayer(req.sessionID)) {
        console.log("Username: ", req.session.username);
        name = req.session.username;
    } else {
        console.log("no login");
        res.redirect("/");
        return;
    }
    res.render("main-menu", {username: name});
});

app.post("/play", (req, res) => {
        res.redirect("/game");
});

app.get('/', (req, res) => {
    if (gameServer.hasplayer(req.sessionID)) {
        req.redirect("/play");
        return;
    } else {
        console.log("no login");
    }
    res.render("index");
});


app.get("/game", (req, res) => {
    let name = "";
    if (gameServer.hasplayer(req.sessionID)) {
        console.log("Username: ", req.session.username);
        name = req.session.username;
    } else {
        console.log("no login");
        res.redirect("/");
        return;
    }
    if (balancer.run() === 0){
        res.render("game", {username: name});
    }else {
        if (balancer.run() === 1){
            res.render("game", {username1: name});
        } 
    }
});


server = app.listen(port, host, function() {
    console.log(`Server listens http://${host}:${port}`);

});



const socketIO = require("socket.io")(server);
// var socketIO = socketIO.listen(server);

socketIO.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

socketIO.on("connection", socket => {
    socket.request.session;


   socket.on("block", (boxId) => {
        console.log(boxId);
   });
   
   socket.on("move", (hod) => {
        console.log(hod);
   });
});

setTimeout(function() {
    socketIO.emit("test", {});
    console.log("send test");
}, 10000);
