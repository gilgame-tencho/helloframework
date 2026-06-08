/**
 * HelloRule Unit Tests
 * 
 * HelloRuleドメインロジックのテスト
 */

const HelloRule = require('../../src/features/hello/domain/HelloRule');

/**
 * テストスイート：HelloRule.isValidMessage
 */
describe('HelloRule.isValidMessage', () => {
    it('should return true for valid message', () => {
        const result = HelloRule.isValidMessage('Hello World');
        console.assert(result === true, 'Valid message should return true');
    });

    it('should return false for empty message', () => {
        const result = HelloRule.isValidMessage('');
        console.assert(result === false, 'Empty message should return false');
    });

    it('should return false for whitespace-only message', () => {
        const result = HelloRule.isValidMessage('   ');
        console.assert(result === false, 'Whitespace-only message should return false');
    });

    it('should return false for message exceeding max length', () => {
        const result = HelloRule.isValidMessage('a'.repeat(256));
        console.assert(result === false, 'Message exceeding 255 chars should return false');
    });

    it('should return false for non-string message', () => {
        const result = HelloRule.isValidMessage(123);
        console.assert(result === false, 'Non-string message should return false');
    });

    it('should return false for null message', () => {
        const result = HelloRule.isValidMessage(null);
        console.assert(result === false, 'Null message should return false');
    });
});

/**
 * テストスイート：HelloRule.formatMessage
 */
describe('HelloRule.formatMessage', () => {
    it('should trim whitespace from message', () => {
        const result = HelloRule.formatMessage('  Hello World  ');
        console.assert(result === 'Hello World', 'Should trim whitespace');
    });

    it('should handle message without whitespace', () => {
        const result = HelloRule.formatMessage('HelloWorld');
        console.assert(result === 'HelloWorld', 'Should handle message without whitespace');
    });
});

/**
 * テストスイート：HelloRule.canCreate
 */
describe('HelloRule.canCreate', () => {
    it('should return true for valid create request', () => {
        const result = HelloRule.canCreate({ message: 'Hello World' });
        console.assert(result === true, 'Valid create request should return true');
    });

    it('should return false for invalid message', () => {
        const result = HelloRule.canCreate({ message: '' });
        console.assert(result === false, 'Invalid message should return false');
    });

    it('should return false for null data', () => {
        const result = HelloRule.canCreate(null);
        console.assert(result === false, 'Null data should return false');
    });
});

console.log('HelloRule Unit Tests completed');
