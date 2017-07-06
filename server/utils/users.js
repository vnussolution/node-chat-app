class Users {
    constructor() {
        this.users = [];
    }

    checkNameExist(client) {
        return this.users.filter((user) => {
            //    console.log(' ==> ', user.name, client.name);
            return user.name === client.name
        });
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        if (this.checkNameExist(user.name)) {
            this.users.push(user);
            return user;
        }
        return;
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

    getRoomList() {
        return this.users.map((u) => u.room);
    }

}

module.exports = { Users };