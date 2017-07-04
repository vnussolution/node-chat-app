var expect = require('expect');
var request = require('supertest');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = { from: 'tester', text: 'hello' };
        var newMessage = generateMessage(message.from, message.text);

        expect(newMessage.from).toBe(message.from);
        expect(newMessage.text).toBe(message.text);
        expect(newMessage.createdAt).toBeA('number');
        expect(newMessage).toInclude(message);
    });
});