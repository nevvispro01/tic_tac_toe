class Player {
    constructor(sessionID, name) {
        this.sessionID = sessionID;
        this.name = name;
        this.socket = null;
    }

    linkSocket(socket) {
        this.socket = socket;
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
        this.players = new Map();
        this.gameRooms = [];
    }

    addPlayer(sessionID, name) {
        this.players.set(sessionID, new Player(sessionID, name));
    }

    linkSocketToPlayer(sessionID, socket) {
       if (this.players.has(sessionID)){
           this.players.get(sessionID).linkSocket(socket);
       }

        result.socket = socket;
    } 

    hasplayer(sessionID) {
        return this.players.has(sessionID);
    }
}

module.exports = GameServer;