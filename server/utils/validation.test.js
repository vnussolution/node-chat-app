const expect = require('expect');

const { isRealString } = require('./../utils/validation');


describe('isRealString', () => {
    it('should reject non-string values', () => {

        var value = 89898;
        var result = isRealString(value);

        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {

        var value = '   ';
        var result = isRealString(value);

        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', () => {

        var value = '   test room  ';
        var result = isRealString(value);

        expect(result).toBe(true);
    });
});