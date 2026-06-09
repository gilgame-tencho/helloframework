const test = require('node:test');
const assert = require('node:assert/strict');
const { Sequelize } = require('sequelize');
const HelloRepository = require('../../src/features/hello/repository/HelloRepository');

async function createTestDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    HelloRepository.initialize(sequelize);
    await sequelize.sync({ force: true });

    return sequelize;
}

test('HelloRepository creates category and retrieves hello message with category', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const category = await HelloRepository.createCategory({
        name: 'system',
        description: 'System category'
    });
    const created = await HelloRepository.create({
        message: 'Test Message',
        categoryId: category.id
    });
    const retrieved = await HelloRepository.findById(created.id);

    assert.equal(retrieved.message, 'Test Message');
    assert.equal(retrieved.category.name, 'system');
});

test('HelloRepository finds categories', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    await HelloRepository.createCategory({ name: 'system' });
    await HelloRepository.createCategory({ name: 'user' });

    const categories = await HelloRepository.findCategories();

    assert.equal(categories.length, 2);
    assert.equal(categories[0].name, 'system');
    assert.equal(categories[1].name, 'user');
});

test('HelloRepository finds category with messages', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const category = await HelloRepository.createCategory({ name: 'operation' });
    await HelloRepository.create({ message: 'Job accepted', categoryId: category.id });
    await HelloRepository.create({ message: 'Notification queued', categoryId: category.id });

    const retrieved = await HelloRepository.findCategoryWithMessages(category.id);

    assert.equal(retrieved.name, 'operation');
    assert.equal(retrieved.messages.length, 2);
    assert.equal(retrieved.messages[0].category.name, 'operation');
});

test('HelloRepository seeds multiple categories and messages idempotently', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    await HelloRepository.seedSampleData();
    await HelloRepository.seedSampleData();

    const categories = await HelloRepository.findCategories();
    const messages = await HelloRepository.findAll();

    assert.equal(categories.length, 3);
    assert.equal(messages.length, 6);
});

test('HelloRepository returns null for non-existent id', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const retrieved = await HelloRepository.findById(9999);

    assert.equal(retrieved, null);
});
