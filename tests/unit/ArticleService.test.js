const test = require('node:test');
const assert = require('node:assert/strict');
const ArticleService = require('../../src/features/blog/service/ArticleService');
const { ArticleRequest } = require('../../src/features/blog/dto/ArticleDTO');

function createArticle(overrides = {}) {
    return {
        id: overrides.id ?? 1,
        title: overrides.title ?? 'HelloBlog',
        body: overrides.body ?? 'Article body',
        status: overrides.status ?? 'draft',
        publishedAt: overrides.publishedAt ?? null,
        createdAt: overrides.createdAt ?? new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: overrides.updatedAt ?? new Date('2026-01-01T00:00:00.000Z')
    };
}

function createMockRepository() {
    const articles = [
        createArticle({ id: 1, status: 'draft' }),
        createArticle({ id: 2, title: 'Published', status: 'published', publishedAt: new Date('2026-01-02T00:00:00.000Z') }),
        createArticle({ id: 3, title: 'Archived', status: 'archived' })
    ];

    return {
        findAll: async (filters = {}) => {
            if (filters.status) {
                return articles.filter((article) => article.status === filters.status);
            }
            return articles;
        },
        findById: async (id) => articles.find((article) => article.id === id) || null,
        create: async (data) => createArticle({ id: 4, ...data }),
        update: async (id, data) => createArticle({ ...articles.find((article) => article.id === id), ...data }),
        delete: async (id) => id !== 999,
        seedSampleData: async () => articles
    };
}

test.beforeEach(() => {
    ArticleService.initialize({
        repository: createMockRepository(),
        sequelize: null
    });
});

test('ArticleService.createArticle creates draft article', async () => {
    const response = await ArticleService.createArticle(new ArticleRequest({
        title: '  New Article  ',
        body: '  New body  ',
        status: 'published'
    }));

    assert.equal(response.id, 4);
    assert.equal(response.title, 'New Article');
    assert.equal(response.body, 'New body');
    assert.equal(response.status, 'draft');
    assert.equal(response.publishedAt, null);
});

test('ArticleService.getArticles filters by status', async () => {
    const response = await ArticleService.getArticles({ status: 'published' });

    assert.equal(response.length, 1);
    assert.equal(response[0].status, 'published');
});

test('ArticleService.publishArticle publishes draft article', async () => {
    const response = await ArticleService.publishArticle(1);

    assert.equal(response.status, 'published');
    assert.ok(response.publishedAt);
});

test('ArticleService.publishArticle keeps already published article published', async () => {
    const response = await ArticleService.publishArticle(2);

    assert.equal(response.status, 'published');
    assert.equal(response.publishedAt, '2026-01-02T00:00:00.000Z');
});

test('ArticleService.archiveArticle archives article', async () => {
    const response = await ArticleService.archiveArticle(1);

    assert.equal(response.status, 'archived');
});

test('ArticleService.updateArticle rejects archived article', async () => {
    await assert.rejects(
        () => ArticleService.updateArticle(3, new ArticleRequest({ title: 'Updated' })),
        /Archived articles cannot be updated/
    );
});

test('ArticleService.publishArticle rejects archived article', async () => {
    await assert.rejects(
        () => ArticleService.publishArticle(3),
        /Archived articles cannot be published/
    );
});
