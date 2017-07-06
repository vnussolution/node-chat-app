const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: '123', name: 'frank', room: 'node course' },
            { id: '456', name: 'truc', room: 'angular course' },
            { id: '678', name: 'bi', room: 'node course' }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = { id: '123', name: 'frank', room: 'test' };

        var result = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([result]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('456');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('45a6');
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var user = users.getUser('456');
        expect(user.id).toBe(users.users[1].id);
    });

    it('should not find a user', () => {
        var user = users.getUser('45a6');
        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('node course');
        expect(userList).toEqual(['frank', 'bi']);
    });

    it('should return names for angular course', () => {
        var userList = users.getUserList('angular course');
        expect(userList).toEqual(['truc']);

    });
});

