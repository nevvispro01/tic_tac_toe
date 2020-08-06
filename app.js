const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
// const Balancer = require("./logic/balancer");
const path = require('path');
const GameServer = require("./logic/server-game");

const app = express();

const host = '0.0.0.0';
const port = 7000;
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'static')));


var gameServer = new GameServer();
// var ballancer = new Balancer(userHandler, gameHandler);
// ballancerCycle = () => {
//     setTimeout(function() {
//         ballancer.run();
//         ballancerCycle();
//     }, 1000);
// }
// ballancerCycle();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: 'you secret key',
      saveUninitialized: true
    })
  );

app.post("/login", (req, res) => {
    if (req.body.username) {
        let newUserName = req.body.username;
        req.session.username = newUserName;
        console.log("Register user: ", newUserName);
        gameServer.addPlayer(newUserName);
        res.redirect("/game");
    }
});

app.get('/', (req, res) => {
    if (req.session.username) {
        console.log("Username: ", req.session.username);
        req.redirect("/game");
        return;
    } else {
        console.log("no login");
    }
    res.render("index");
});


app.get("/game", (req, res) => {
    let name = "";
    if (req.session.username) {
        console.log("Username: ", req.session.username);
        name = req.session.username;
    } else {
        console.log("no login");
        res.redirect("/");
        return;
    }
    res.render("game", {username: name});
});


server = app.listen(port, host, function() {
    console.log(`Server listens http://${host}:${port}`);

});



const socketIO = require("socket.io")(server);
// var socketIO = socketIO.listen(server);


socketIO.on("connection", socket => {
    

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
