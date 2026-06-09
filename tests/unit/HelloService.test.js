const test = require('node:test');
const assert = require('node:assert/strict');
const HelloService = require('../../src/features/hello/service/HelloService');
const { CreateHelloRequest } = require('../../src/features/hello/dto/HelloDTO');

function createCategory(id = 1, name = 'system') {
    return {
        id,
        name,
        description: `${name} category`
    };
}

function createMessage(id, message, category = createCategory()) {
    return {
        id,
        message,
        categoryId: category.id,
        category
    };
}

function createMockRepository() {
    const system = createCategory(1, 'system');
    const user = createCategory(2, 'user');

    return {
        findLatest: async () => createMessage(2, 'Hello Test', user),
        findAll: async () => [
            createMessage(2, 'Hello Test', user),
            createMessage(1, 'Hello World', system)
        ],
        findById: async (id) => {
            if (id === 1) {
                return createMessage(1, 'Hello World', system);
            }
            if (id === 3) {
                return createMessage(3, 'Hello Created', system);
            }
            return null;
        },
        findCategories: async () => [system, user],
        findCategoryById: async (id) => id === 1 ? system : null,
        findCategoryWithMessages: async (id) => id === 1 ? {
            ...system,
            messages: [
                createMessage(1, 'Hello World', system),
                createMessage(3, 'System Ready', system)
            ]
        } : null,
        create: async (data) => createMessage(3, data.message, system),
        seedSampleData: async () => ({
            categories: [system, user],
            messages: [
                createMessage(1, 'Hello World', system),
                createMessage(2, 'Hello Test', user)
            ]
        })
    };
}

test.beforeEach(() => {
    HelloService.initialize({
        repository: createMockRepository(),
        sequelize: null
    });
});

test('HelloService.getLatestMessage returns latest message with category', async () => {
    const response = await HelloService.getLatestMessage();

    assert.equal(response.id, 2);
    assert.equal(response.message, 'Hello Test');
    assert.equal(response.category.id, 2);
    assert.equal(response.category.name, 'user');
});

test('HelloService.getAllMessages returns all messages with categories', async () => {
    const response = await HelloService.getAllMessages();

    assert.equal(response.length, 2);
    assert.equal(response[0].category.name, 'user');
    assert.equal(response[1].category.name, 'system');
});

test('HelloService.getMessageById returns message by id', async () => {
    const response = await HelloService.getMessageById(1);

    assert.equal(response.id, 1);
    assert.equal(response.message, 'Hello World');
    assert.equal(response.category.name, 'system');
});

test('HelloService.getMessageById throws when message is missing', async () => {
    await assert.rejects(
        () => HelloService.getMessageById(999),
        /not found/
    );
});

test('HelloService.getCategories returns categories', async () => {
    const response = await HelloService.getCategories();

    assert.equal(response.length, 2);
    assert.equal(response[0].name, 'system');
    assert.equal(response[1].name, 'user');
});

test('HelloService.getCategoryWithMessages returns category and messages', async () => {
    const response = await HelloService.getCategoryWithMessages(1);

    assert.equal(response.id, 1);
    assert.equal(response.name, 'system');
    assert.equal(response.messages.length, 2);
    assert.equal(response.messages[0].category.name, 'system');
});

test('HelloService.createMessage creates formatted message in category', async () => {
    const response = await HelloService.createMessage(new CreateHelloRequest('  Hello Created  ', 1));

    assert.equal(response.id, 3);
    assert.equal(response.message, 'Hello Created');
    assert.equal(response.category.name, 'system');
});

test('HelloService.createMessage rejects missing category', async () => {
    await assert.rejects(
        () => HelloService.createMessage(new CreateHelloRequest('Hello Missing Category', 999)),
        /category/
    );
});

test('HelloService.createMessage rejects invalid request', async () => {
    await assert.rejects(
        () => HelloService.createMessage(new CreateHelloRequest('')),
        /Invalid message data/
    );
});

test('HelloService.seedSampleData delegates to repository', async () => {
    const response = await HelloService.seedSampleData();

    assert.equal(response.categories.length, 2);
    assert.equal(response.messages.length, 2);
});
