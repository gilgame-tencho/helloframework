const ArticleService = require('../service/ArticleService');
const { ArticleRequest } = require('../dto/ArticleDTO');
const {
    validateCreateArticle,
    validateUpdateArticle,
    validateListArticles,
    validateIdParam
} = require('../validator/ArticleValidator');

class ArticleController {
    static async getArticles(req, res) {
        const queryValidation = validateListArticles(req.query);

        if (!queryValidation.success) {
            return this.respondValidationError(res, queryValidation);
        }

        try {
            const response = await ArticleService.getArticles(queryValidation.data);
            res.status(200).json(response);
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static async getArticleById(req, res) {
        const idValidation = validateIdParam(req.params);

        if (!idValidation.success) {
            return this.respondValidationError(res, idValidation);
        }

        try {
            const response = await ArticleService.getArticleById(idValidation.data.id);
            res.status(200).json(response);
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static async createArticle(req, res) {
        const validation = validateCreateArticle(req.body);

        if (!validation.success) {
            return this.respondValidationError(res, validation);
        }

        try {
            const request = new ArticleRequest(validation.data);
            const response = await ArticleService.createArticle(request);
            res.status(201).json(response);
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static async updateArticle(req, res) {
        const idValidation = validateIdParam(req.params);

        if (!idValidation.success) {
            return this.respondValidationError(res, idValidation);
        }

        const bodyValidation = validateUpdateArticle(req.body);

        if (!bodyValidation.success) {
            return this.respondValidationError(res, bodyValidation);
        }

        try {
            const request = new ArticleRequest(bodyValidation.data);
            const response = await ArticleService.updateArticle(idValidation.data.id, request);
            res.status(200).json(response);
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static async publishArticle(req, res) {
        await this.runArticleAction(req, res, (id) => ArticleService.publishArticle(id));
    }

    static async archiveArticle(req, res) {
        await this.runArticleAction(req, res, (id) => ArticleService.archiveArticle(id));
    }

    static async deleteArticle(req, res) {
        const idValidation = validateIdParam(req.params);

        if (!idValidation.success) {
            return this.respondValidationError(res, idValidation);
        }

        try {
            await ArticleService.deleteArticle(idValidation.data.id);
            res.status(204).send();
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static async runArticleAction(req, res, action) {
        const idValidation = validateIdParam(req.params);

        if (!idValidation.success) {
            return this.respondValidationError(res, idValidation);
        }

        try {
            const response = await action(idValidation.data.id);
            res.status(200).json(response);
        } catch (error) {
            this.respondError(res, error);
        }
    }

    static respondValidationError(res, validation) {
        return res.status(400).json({
            error: 'Validation failed',
            details: validation.error.errors
        });
    }

    static respondError(res, error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
}

module.exports = ArticleController;
