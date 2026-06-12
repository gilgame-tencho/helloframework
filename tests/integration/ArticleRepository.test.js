const test = require('node:test');
const assert = require('node:assert/strict');
const { Sequelize } = require('sequelize');
const ArticleRepository = require('../../src/features/blog/repository/ArticleRepository');

async function createTestDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    ArticleRepository.initialize(sequelize);
    await sequelize.sync({ force: true });

    return sequelize;
}

test('ArticleRepository creates and retrieves article', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const created = await ArticleRepository.create({
        title: 'HelloBlog',
        body: 'Article body',
        status: 'draft'
    });
    const retrieved = await ArticleRepository.findById(created.id);

    assert.equal(retrieved.title, 'HelloBlog');
    assert.equal(retrieved.body, 'Article body');
    assert.equal(retrieved.status, 'draft');
});

test('ArticleRepository filters articles by status', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    await ArticleRepository.create({ title: 'Draft', body: 'Body', status: 'draft' });
    await ArticleRepository.create({ title: 'Published', body: 'Body', status: 'published', publishedAt: new Date() });

    const drafts = await ArticleRepository.findAll({ status: 'draft' });
    const published = await ArticleRepository.findAll({ status: 'published' });

    assert.equal(drafts.length, 1);
    assert.equal(drafts[0].title, 'Draft');
    assert.equal(published.length, 1);
    assert.equal(published[0].title, 'Published');
});

test('ArticleRepository updates article', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const created = await ArticleRepository.create({ title: 'Draft', body: 'Body', status: 'draft' });
    const updated = await ArticleRepository.update(created.id, {
        title: 'Updated',
        status: 'published',
        publishedAt: new Date('2026-01-01T00:00:00.000Z')
    });

    assert.equal(updated.title, 'Updated');
    assert.equal(updated.status, 'published');
    assert.ok(updated.publishedAt);
});

test('ArticleRepository deletes article', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    const created = await ArticleRepository.create({ title: 'Draft', body: 'Body', status: 'draft' });
    const deleted = await ArticleRepository.delete(created.id);
    const retrieved = await ArticleRepository.findById(created.id);

    assert.equal(deleted, true);
    assert.equal(retrieved, null);
});

test('ArticleRepository seeds sample articles idempotently', async (t) => {
    const sequelize = await createTestDatabase();
    t.after(async () => sequelize.close());

    await ArticleRepository.seedSampleData();
    await ArticleRepository.seedSampleData();

    const articles = await ArticleRepository.findAll();

    assert.equal(articles.length, 3);
    assert.equal(articles.some((article) => article.status === 'draft'), true);
    assert.equal(articles.some((article) => article.status === 'published'), true);
    assert.equal(articles.some((article) => article.status === 'archived'), true);
});
