const test = require('node:test');
const assert = require('node:assert/strict');
const HelloRule = require('../../src/features/hello/domain/HelloRule');

test('HelloRule.isValidMessage validates message content', () => {
    assert.equal(HelloRule.isValidMessage('Hello World'), true);
    assert.equal(HelloRule.isValidMessage(''), false);
    assert.equal(HelloRule.isValidMessage('   '), false);
    assert.equal(HelloRule.isValidMessage('a'.repeat(256)), false);
    assert.equal(HelloRule.isValidMessage(123), false);
    assert.equal(HelloRule.isValidMessage(null), false);
});

test('HelloRule.formatMessage trims whitespace', () => {
    assert.equal(HelloRule.formatMessage('  Hello World  '), 'Hello World');
    assert.equal(HelloRule.formatMessage('HelloWorld'), 'HelloWorld');
});

test('HelloRule.canCreate validates create data', () => {
    assert.equal(HelloRule.canCreate({ message: 'Hello World' }), true);
    assert.equal(HelloRule.canCreate({ message: '' }), false);
    assert.equal(HelloRule.canCreate(null), false);
});
