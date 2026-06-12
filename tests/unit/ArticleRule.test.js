const test = require('node:test');
const assert = require('node:assert/strict');
const { ArticleRule, ARTICLE_STATUSES } = require('../../src/features/blog/domain/ArticleRule');

test('ArticleRule validates statuses', () => {
    assert.equal(ArticleRule.isValidStatus(ARTICLE_STATUSES.DRAFT), true);
    assert.equal(ArticleRule.isValidStatus(ARTICLE_STATUSES.PUBLISHED), true);
    assert.equal(ArticleRule.isValidStatus(ARTICLE_STATUSES.ARCHIVED), true);
    assert.equal(ArticleRule.isValidStatus('invalid'), false);
});

test('ArticleRule.normalizeCreateData forces draft status', () => {
    const data = ArticleRule.normalizeCreateData({
        title: '  HelloBlog  ',
        body: '  Body  ',
        status: ARTICLE_STATUSES.PUBLISHED
    });

    assert.equal(data.title, 'HelloBlog');
    assert.equal(data.body, 'Body');
    assert.equal(data.status, ARTICLE_STATUSES.DRAFT);
    assert.equal(data.publishedAt, null);
});

test('ArticleRule detects editable and publishable articles', () => {
    assert.equal(ArticleRule.isEditable({ status: ARTICLE_STATUSES.DRAFT }), true);
    assert.equal(ArticleRule.isEditable({ status: ARTICLE_STATUSES.PUBLISHED }), true);
    assert.equal(ArticleRule.isEditable({ status: ARTICLE_STATUSES.ARCHIVED }), false);
    assert.equal(ArticleRule.canPublish({ status: ARTICLE_STATUSES.ARCHIVED }), false);
});

test('ArticleRule.applyPublish keeps existing publishedAt when present', () => {
    const publishedAt = new Date('2026-01-01T00:00:00.000Z');
    const result = ArticleRule.applyPublish({ publishedAt });

    assert.equal(result.status, ARTICLE_STATUSES.PUBLISHED);
    assert.equal(result.publishedAt, publishedAt);
});

test('ArticleRule.applyArchive sets archived status', () => {
    assert.deepEqual(ArticleRule.applyArchive(), {
        status: ARTICLE_STATUSES.ARCHIVED
    });
});
