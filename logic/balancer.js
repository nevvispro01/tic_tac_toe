const UserHandler = require("./user-handler");
const GameHandler = require("./game-handler");

const runCallbackTimeoutMsec = 1000;

class Balancer {
    constructor(userHandler, gameHandler) {
        this.userHandler = userHandler;
        this.gameHandler = gameHandler;
    }

    
    run() {
        
    }
}

module.exports = Balancer;