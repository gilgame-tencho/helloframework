/**
 * HelloValidator Unit Tests
 * 
 * HelloValidatorのバリデーション処理のテスト
 */

const { validateCreateHello } = require('../../src/features/hello/validator/HelloValidator');

/**
 * テストスイート：validateCreateHello
 */
describe('validateCreateHello', () => {
    it('should validate correct create request', () => {
        const result = validateCreateHello({ message: 'Hello World' });
        console.assert(result.success === true, 'Valid request should pass');
        console.assert(result.data.message === 'Hello World', 'Data should match');
    });

    it('should reject empty message', () => {
        const result = validateCreateHello({ message: '' });
        console.assert(result.success === false, 'Empty message should fail');
    });

    it('should reject missing message', () => {
        const result = validateCreateHello({});
        console.assert(result.success === false, 'Missing message should fail');
    });

    it('should reject message exceeding max length', () => {
        const result = validateCreateHello({ message: 'a'.repeat(256) });
        console.assert(result.success === false, 'Message exceeding 255 chars should fail');
    });

    it('should accept message at max length', () => {
        const result = validateCreateHello({ message: 'a'.repeat(255) });
        console.assert(result.success === true, 'Message of 255 chars should pass');
    });

    it('should reject non-string message', () => {
        const result = validateCreateHello({ message: 123 });
        console.assert(result.success === false, 'Non-string message should fail');
    });
});

console.log('HelloValidator Unit Tests completed');
