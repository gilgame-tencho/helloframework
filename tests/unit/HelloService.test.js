const test = require('node:test');
const assert = require('node:assert/strict');
const HelloService = require('../../src/features/hello/service/HelloService');
const { CreateHelloRequest } = require('../../src/features/hello/dto/HelloDTO');

function createMockRepository() {
    return {
        findLatest: async () => ({ id: 1, message: 'Hello World' }),
        findAll: async () => [
            { id: 1, message: 'Hello World' },
            { id: 2, message: 'Hello Test' }
        ],
        findById: async (id) => id === 1 ? { id: 1, message: 'Hello World' } : null,
        create: async (data) => ({ id: 3, message: data.message })
    };
}

test.beforeEach(() => {
    HelloService.initialize({
        repository: createMockRepository(),
        sequelize: null
    });
});

test('HelloService.getLatestMessage returns latest message', async () => {
    const response = await HelloService.getLatestMessage();

    assert.equal(response.id, 1);
    assert.equal(response.message, 'Hello World');
});

test('HelloService.getAllMessages returns all messages', async () => {
    const response = await HelloService.getAllMessages();

    assert.equal(response.length, 2);
    assert.equal(response[0].id, 1);
    assert.equal(response[0].message, 'Hello World');
    assert.equal(response[1].id, 2);
    assert.equal(response[1].message, 'Hello Test');
});

test('HelloService.getMessageById returns message by id', async () => {
    const response = await HelloService.getMessageById(1);

    assert.equal(response.id, 1);
    assert.equal(response.message, 'Hello World');
});

test('HelloService.getMessageById throws when message is missing', async () => {
    await assert.rejects(
        () => HelloService.getMessageById(999),
        /not found/
    );
});

test('HelloService.createMessage creates formatted message', async () => {
    const response = await HelloService.createMessage(new CreateHelloRequest('  Hello Created  '));

    assert.equal(response.id, 3);
    assert.equal(response.message, 'Hello Created');
});

test('HelloService.createMessage rejects invalid request', async () => {
    await assert.rejects(
        () => HelloService.createMessage(new CreateHelloRequest('')),
        /Invalid message data/
    );
});
