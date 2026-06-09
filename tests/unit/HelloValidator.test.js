const test = require('node:test');
const assert = require('node:assert/strict');
const {
    validateCreateHello,
    validateIdParam
} = require('../../src/features/hello/validator/HelloValidator');

test('validateCreateHello accepts valid create request', () => {
    const result = validateCreateHello({ message: 'Hello World', categoryId: 1 });

    assert.equal(result.success, true);
    assert.equal(result.data.message, 'Hello World');
    assert.equal(result.data.categoryId, 1);
});

test('validateCreateHello rejects invalid create request', () => {
    assert.equal(validateCreateHello({ message: '' }).success, false);
    assert.equal(validateCreateHello({}).success, false);
    assert.equal(validateCreateHello({ message: 'a'.repeat(256) }).success, false);
    assert.equal(validateCreateHello({ message: 123 }).success, false);
    assert.equal(validateCreateHello({ message: 'Hello', categoryId: 0 }).success, false);
});

test('validateCreateHello accepts message at max length', () => {
    assert.equal(validateCreateHello({ message: 'a'.repeat(255) }).success, true);
});

test('validateIdParam coerces positive integer id', () => {
    const result = validateIdParam({ id: '10' });

    assert.equal(result.success, true);
    assert.equal(result.data.id, 10);
    assert.equal(validateIdParam({ id: '0' }).success, false);
});
