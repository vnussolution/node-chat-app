var expect = require('expect');
var request = require('supertest');

var { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationmessage', () => {
    it('should generate correct location message obj', () => {
        var message = { from: 'tester', lat: 123, long: 456 };
        var newMessage = generateLocationMessage(message.from, message.lat, message.long);

        expect(newMessage.from).toBe(message.from);
        expect(newMessage.url).toBe(`https://www.google.com/maps?q=${message.lat},${message.long}`);
        expect(newMessage.createdAt).toBeA('number');
        //expect(newMessage).toInclude(message);
    });
});