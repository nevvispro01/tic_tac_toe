const Balancer = require("./balancer");

class Player {
    constructor(sessionID, name) {
        this.sessionID = sessionID;
        this.name = name;
        this.socket = null;
        this.playerPlay = false;
        this.room = null;
    }

    linkSocket(socket) {
        this.socket = socket;
        this.socket.emit("Name", {userName : this.name});
    }

    playerPlay2() {
        this.playerPlay = true;
        this.socket.emit("EmptyPage", {});
    }

    gameLaunch(opponentName, bool) {
        this.socket.emit("gameLaunch", {myname : this.name, opponent : opponentName, hod : bool});
    }

    playerTurn(gameMap, opponentName, bool) {
        this.socket.emit("gameLaunch", {myname : this.name, opponent : opponentName, hod : bool});
        this.socket.emit("map", {map : gameMap});
    }

    boxId2(boxId){
        this.room.gameProcess(boxId, this.name);
    }

    winner(name){
        this.socket.emit("winner", {Name: name});
    }

    draw() {
        this.socket.emit("draw", {});
    }

    exit() {
        this.socket.emit("Name", {userName : this.name});
        this.playerPlay = false;
        this.room = null;
    }
    
}




class GameServer {
    constructor() {
        this.players = new Map(); //(sessionID, name, socket);
        this.room = new Map();    //(id, gameMap[], player1, player2);
        this.id = 0;
    }

    addPlayer(sessionID, name) {
        this.players.set(sessionID, new Player(sessionID, name));
    }

    linkSocketToPlayer(sessionID, socket) {
       if (this.players.has(sessionID)){
           this.players.get(sessionID).linkSocket(socket);
       }

        //result.socket = socket;
    } 

    hasplayer(sessionID) {
            return this.players.has(sessionID);
    }

    getName(sessionID) {
        if (this.players.has(sessionID)){
            return this.players.get(sessionID).name;
        }
    }

    PlayerPlay(sessionID) {
        if (this.players.has(sessionID)){
            this.players.get(sessionID).playerPlay2();
            balancer.tick(this.players.get(sessionID));
        }
    }

    addRoom(id){
        this.room.set(id, new Room(id));
    }
    
    // addPlayerRoom(id, player) {
    //     if (this.room.has(id)){
    //        this.room.get(id).addPlayerToRoom(player);  // Надо добавить проверку на добовление игрока в addPlayerToRoom
    //     }
    // }

    boxId(boxId, sessionID){
        if (this.players.has(sessionID)){
            this.players.get(sessionID).boxId2(boxId);
        }
    }

    findFreeRoom() {
        let findId = false;
        this.id = 1;
        while(findId === false){
            if (this.room.has(this.id)){
                if (this.room.get(this.id).player1 === null){
                    return this.room.get(this.id).id;
                }else {
                    if (this.room.get(this.id).player2 === null) {
                        return this.room.get(this.id).id;
                    }
                }
            }else {
                this.room.set(this.id, new Room(this.id));
                this.room.get(this.id).creatureGameMap();
                return this.room.get(this.id).id;
            }
            this.id++;
        }
    }
    

    exit(sessionID) {
        this.players.get(sessionID).exit();
    }
}

var gameServer = new GameServer();
var balancer = new Balancer(gameServer);

class Room {
    constructor(id) {
        this.id = id;
        this.gameMap = [];
        this.player1 = null;
        this.player2 = null;
        this.hod = null;
        this.numberOfMoves = 0;
    }

    creatureGameMap(){
        for (var i=0; i<9; i++) {
            this.gameMap[i] = 0;
        }
    }

    gameProcess(boxId, name) {
        this.numberOfMoves++;
        if (this.hod === name){
            if (this.gameMap[boxId] === 0){
                if (name === this.player1.name){
                    this.gameMap[boxId] = 1;
                    this.player1.playerTurn(this.gameMap, this.player2.name, true);
                    this.player2.playerTurn(this.gameMap, this.player1.name, false);
                    this.hod = this.player2.name;
                    this.checkWinner();
                }else{
                    if (name === this.player2.name){
                        this.gameMap[boxId] = 2;
                        this.player1.playerTurn(this.gameMap, this.player2.name, false);
                        this.player2.playerTurn(this.gameMap, this.player1.name, true);
                        this.hod = this.player1.name;
                        this.checkWinner();
                    }
                }
            }
        }
    }

    addPlayerToRoom(player) {
        if (this.player1 === null){
            this.player1 = player;
            this.hod = this.player1.name;
        }else {
            if (this.player2 === null){
                this.player2 = player;
            }else{
                return false;
            }
        }
        return true;
    }

    gameLaunch() {
        this.player1.gameLaunch(this.player2.name, false);
        this.player2.gameLaunch(this.player1.name, true);
    }

    checkWinner(){
        if (this.gameMap[0] === 1  && this.gameMap[1] === 1 && this.gameMap[2] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[3] === 1  && this.gameMap[4] === 1 && this.gameMap[5] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[6] === 1  && this.gameMap[7] === 1 && this.gameMap[8] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[0] === 1  && this.gameMap[3] === 1 && this.gameMap[6] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[1] === 1  && this.gameMap[4] === 1 && this.gameMap[7] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[2] === 1  && this.gameMap[5] === 1 && this.gameMap[8] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[0] === 1  && this.gameMap[4] === 1 && this.gameMap[8] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();
        if (this.gameMap[6] === 1  && this.gameMap[4] === 1 && this.gameMap[2] === 1) this.player1.winner(this.player1.name), this.player2.winner(this.player1.name), this.exitRoom();

        if (this.gameMap[0] === 2  && this.gameMap[1] === 2 && this.gameMap[2] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[3] === 2  && this.gameMap[4] === 2 && this.gameMap[5] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[6] === 2  && this.gameMap[7] === 2 && this.gameMap[8] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[0] === 2  && this.gameMap[3] === 2 && this.gameMap[6] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[1] === 2  && this.gameMap[4] === 2 && this.gameMap[7] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[2] === 2  && this.gameMap[5] === 2 && this.gameMap[8] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[0] === 2  && this.gameMap[4] === 2 && this.gameMap[8] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();
        if (this.gameMap[6] === 2  && this.gameMap[4] === 2 && this.gameMap[2] === 2) this.player1.winner(this.player2.name), this.player2.winner(this.player2.name), this.exitRoom();

        if (this.numberOfMoves === 10) this.player1.draw(), this.player2.draw(), this.exitRoom();
    }

    exitRoom() {
        this.player1 = null;
        this.player2 = null;
        this.hod = null;
        this.creatureGameMap();
    }

}

module.exports = GameServer;

