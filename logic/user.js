
class UserStatistic {
    constructor() {
        this.gameCount = 0;
        this.winCount = 0;
        this.loseCount = 0;
        this.gamesForX = 0;
        this.gamesForO = 0;
    }
}

class User {
    constructor(name, pass) {
        this.name = name;
        this.password = pass;
        this.statistic = new UserStatistic();
        this.roomId = -1;
    }

    linkToRoom(roomId) {
        this.roomId = roomId;
    }
}

module.exports = User;