const test = require('node:test');
const assert = require('node:assert/strict');
const {
    validateCreateArticle,
    validateUpdateArticle,
    validateListArticles,
    validateIdParam
} = require('../../src/features/blog/validator/ArticleValidator');

test('validateCreateArticle accepts valid article data', () => {
    const result = validateCreateArticle({
        title: 'HelloBlog',
        body: 'Article body',
        status: 'published'
    });

    assert.equal(result.success, true);
    assert.equal(result.data.title, 'HelloBlog');
    assert.equal(result.data.body, 'Article body');
});

test('validateCreateArticle rejects missing title', () => {
    const result = validateCreateArticle({ body: 'Article body' });

    assert.equal(result.success, false);
});

test('validateCreateArticle rejects missing body', () => {
    const result = validateCreateArticle({ title: 'HelloBlog' });

    assert.equal(result.success, false);
});

test('validateCreateArticle enforces length and status rules', () => {
    assert.equal(validateCreateArticle({ title: '', body: 'Article body' }).success, false);
    assert.equal(validateCreateArticle({ title: 'a'.repeat(101), body: 'Article body' }).success, false);
    assert.equal(validateCreateArticle({ title: 'HelloBlog', body: '' }).success, false);
    assert.equal(validateCreateArticle({ title: 'HelloBlog', body: 'a'.repeat(5001) }).success, false);
    assert.equal(validateCreateArticle({ title: 'HelloBlog', body: 'Article body', status: 'invalid' }).success, false);
});

test('validateUpdateArticle accepts partial updates', () => {
    assert.equal(validateUpdateArticle({ title: 'Updated' }).success, true);
    assert.equal(validateUpdateArticle({ body: 'Updated body' }).success, true);
    assert.equal(validateUpdateArticle({ status: 'archived' }).success, true);
});

test('validateListArticles accepts optional status filter', () => {
    assert.equal(validateListArticles({}).success, true);
    assert.equal(validateListArticles({ status: 'draft' }).success, true);
    assert.equal(validateListArticles({ status: 'invalid' }).success, false);
});

test('validateIdParam coerces positive integer id', () => {
    const result = validateIdParam({ id: '10' });

    assert.equal(result.success, true);
    assert.equal(result.data.id, 10);
    assert.equal(validateIdParam({ id: '0' }).success, false);
});
