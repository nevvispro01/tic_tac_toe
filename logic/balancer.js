const runCallbackTimeoutMsec = 1000;

let room = [];
let number;

room[0] = 0;
room[1] = 0;

class Balancer {
    constructor() {
    }

    run() {
        if (room[0] === 0) {
            room[0] = 1;
            number = 0;
            return number;
        }else {
            if (room[1] === 0) {
                room[1] = 1;
                number = 1;
                return number;
            }
        }        
    }
}

module.exports = Balancer;