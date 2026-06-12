class ArticleRequest {
    constructor({ title, body, status } = {}) {
        this.title = title;
        this.body = body;
        this.status = status;
    }
}

class ArticleResponse {
    constructor(id, title, body, status, publishedAt, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.status = status;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromModel(model) {
        if (!model) {
            return null;
        }

        return new ArticleResponse(
            model.id,
            model.title,
            model.body,
            model.status,
            formatDate(model.publishedAt),
            formatDate(model.createdAt),
            formatDate(model.updatedAt)
        );
    }
}

function formatDate(value) {
    if (!value) {
        return null;
    }

    return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

module.exports = {
    ArticleRequest,
    ArticleResponse
};
