const MongoClient = require("mongodb").MongoClient;
const GameServer = require("./server-game");

class DatabaseWorker {       // бд (name, password, )
    constructor(url, gameServer) {
        this.url = url;
        this.mongoClient = new MongoClient(url, { useNewUrlParser: true });
        this.gameServer = gameServer;
    }

    player_registration(player_name, password) {
        let user = {name: player_name, password: password};
        this.mongoClient.connect(function(err, client){
            const db = client.db("usersdb");
            const collection = db.collection("users");

            collection.insertOne(user, function(err, result){
                if(err){ 
                    console.log(err);
                }
                console.log(result.ops);
            });

            client.close();
        });

    }


    login_check(player_name, password, resolve, reject) {


            this.mongoClient.connect(function(err, client){
                const db = client.db("usersdb");
                const collection = db.collection("users");

                if(err) console.log(err);

                collection.findOne({name: player_name, password: password}, function(err, doc){

                    if(err) console.log(err);

                    if (doc != undefined){
                        resolve("");
                    }else {
                        reject("");
                    }

                });

                client.close();
            });


        // let result = false;

        // this.mongoClient.connect(function(err, client){
        //     const db = client.db("usersdb");
        //     const collection = db.collection("users");

        //     if(err) console.log(err);

        //     collection.findOne({name: player_name, password: password}, function(err, doc){

        //         if(err) console.log(err);

        //         result = doc != undefined;

        //         // if (doc != undefined){
        //         //     let newUserName = req.body.username;
        //         //     console.log("Register user: ", newUserName);
        //         //     this.gameServer.addPlayer(req.sessionID, newUserName);
        //         //     res.redirect("/game");
        //         // }else {
        //         //     res.render("index");
        //         // }

        //     });

        //     client.close();
        // });

        // return result;
    }
     
}

module.exports = DatabaseWorker;