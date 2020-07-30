const User = require("./user");

class UserHandler {
    constructor() {
        this.activeUsernames = [];
        this.users = new Map(); // [string username, User user]
    }
    
    register(name, pass) {
        this.users.set(name, new User(name, pass));
    }

    alreadyLoggedIn(name) {
        return this.activeUsernames.includes(name);
    }

    getUserByName(name) {
        return this.users.get(name);
    }

    userIsExists(username) {
        return this.users.has(username);
    }

    login(name, pass) {
        isValidParameters = (user, name, pass) => {
            return user.name === name && user.password === pass;
        };
        if (this.users.has(name)
            && isValidParameters(this.users.get(name), name, pass)
            && !this.alreadyLoggedIn(name)) {
            this.activeUsernames.push(name);
        }
    }

    linkUserToRoom(username, roomId) {
        if (this.activeUsernames.has(username)) {
            this.users[username].roomId = roomId;
            return true;
        }
        return false;
    }
}

module.exports = UserHandler;