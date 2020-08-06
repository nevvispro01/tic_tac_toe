class Player {
    constructor(name) {
        this.name = name;
        this.socket = null;
    }
}


class Game {
    constructor(allblockSserver, hod, block, move) {
        this.allblockSserver = allblockSserver;
        this.hod = hod;
        this.block = block;
        this.move = move;
    }

    getCheckingTheStrokeAndBlock() {
        if ((allblockSserver[block] === '') && (move = hod)) {
            
        }
    }
}


class GameServer {
    constructor() {
        this.players = [];
        this.gameRooms = [];
    }

    addPlayer(name) {
        this.players.push(new Player(name));
    }

    linkSocketToPlayer(name, socket) {
        let result = players.find(function(item, index, array){
            return item.name === name;
        });

        result.socket = socket;
    } 
}

module.exports = GameServer;