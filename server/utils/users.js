class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    getUser(id) {
        var user = this.users.filter((u) => u.id === id);
        return user[0];
    }

    removeUser(id) {
        var user = this.getUser(id);
        this.users = this.users.filter((user) => user.id !== id);
        return user;
    }



    getUserList(room) {
        var users = this.users.filter((u) => u.room === room);
        var namesArray = users.map((u) => u.name);
        return namesArray;
    }

}

module.exports = { Users };