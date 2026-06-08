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

test('HelloRepository creates and retrieves hello message', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const created = await HelloRepository.create({ message: 'Test Message' });
    const retrieved = await HelloRepository.findLatest();

    assert.equal(created.message, 'Test Message');
    assert.equal(retrieved.message, 'Test Message');
});

test('HelloRepository finds message by id', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const created = await HelloRepository.create({ message: 'Test Message 2' });
    const retrieved = await HelloRepository.findById(created.id);

    assert.equal(retrieved.id, created.id);
});

test('HelloRepository returns null for non-existent id', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const retrieved = await HelloRepository.findById(9999);

    assert.equal(retrieved, null);
});
