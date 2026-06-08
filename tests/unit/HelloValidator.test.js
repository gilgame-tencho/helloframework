const test = require('node:test');
const assert = require('node:assert/strict');
const { validateCreateHello } = require('../../src/features/hello/validator/HelloValidator');

test('validateCreateHello accepts valid create request', () => {
    const result = validateCreateHello({ message: 'Hello World' });

    assert.equal(result.success, true);
    assert.equal(result.data.message, 'Hello World');
});

test('validateCreateHello rejects invalid create request', () => {
    assert.equal(validateCreateHello({ message: '' }).success, false);
    assert.equal(validateCreateHello({}).success, false);
    assert.equal(validateCreateHello({ message: 'a'.repeat(256) }).success, false);
    assert.equal(validateCreateHello({ message: 123 }).success, false);
});

test('validateCreateHello accepts message at max length', () => {
    assert.equal(validateCreateHello({ message: 'a'.repeat(255) }).success, true);
});
