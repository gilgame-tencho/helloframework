class ArticleRequest {
    constructor({ title, body, author, status } = {}) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.status = status;
    }
}

class ArticleResponse {
    constructor(id, title, body, author, status, publishedAt, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
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
            model.author,
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
