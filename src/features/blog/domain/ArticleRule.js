const ARTICLE_STATUSES = Object.freeze({
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
});

class ArticleRule {
    static getAllowedStatuses() {
        return Object.values(ARTICLE_STATUSES);
    }

    static isValidStatus(status) {
        return this.getAllowedStatuses().includes(status);
    }

    static isEditable(article) {
        return article && article.status !== ARTICLE_STATUSES.ARCHIVED;
    }

    static canPublish(article) {
        return article && article.status !== ARTICLE_STATUSES.ARCHIVED;
    }

    static normalizeCreateData(data) {
        return {
            title: data.title.trim(),
            body: data.body.trim(),
            status: ARTICLE_STATUSES.DRAFT,
            publishedAt: null
        };
    }

    static normalizeUpdateData(data) {
        const normalized = {};

        if (data.title !== undefined) {
            normalized.title = data.title.trim();
        }

        if (data.body !== undefined) {
            normalized.body = data.body.trim();
        }

        if (data.status !== undefined) {
            normalized.status = data.status;
            if (data.status !== ARTICLE_STATUSES.PUBLISHED) {
                normalized.publishedAt = null;
            }
        }

        return normalized;
    }

    static applyPublish(article) {
        return {
            status: ARTICLE_STATUSES.PUBLISHED,
            publishedAt: article.publishedAt || new Date()
        };
    }

    static applyArchive() {
        return {
            status: ARTICLE_STATUSES.ARCHIVED
        };
    }
}

module.exports = {
    ArticleRule,
    ARTICLE_STATUSES
};
