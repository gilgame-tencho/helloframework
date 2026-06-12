const { NotFoundError, ConflictError } = require('../../../shared/errors/ApplicationError');
const ArticleRepository = require('../repository/ArticleRepository');
const { ArticleRule } = require('../domain/ArticleRule');
const { ArticleResponse } = require('../dto/ArticleDTO');

class ArticleService {
    static repository = ArticleRepository;
    static sequelize = null;

    static initialize({ repository = ArticleRepository, sequelize = null } = {}) {
        this.repository = repository;
        this.sequelize = sequelize;
    }

    static async getArticles(filters = {}) {
        const records = await this.repository.findAll(filters);
        return records.map((record) => ArticleResponse.fromModel(record));
    }

    static async getArticleById(id) {
        const article = await this.repository.findById(id);

        if (!article) {
            throw new NotFoundError(`Article with id ${id} not found`);
        }

        return ArticleResponse.fromModel(article);
    }

    static async createArticle(request) {
        const data = ArticleRule.normalizeCreateData(request);
        const createRecord = async (transaction) => {
            return await this.repository.create(data, transaction ? { transaction } : {});
        };

        const created = this.sequelize
            ? await this.sequelize.transaction(createRecord)
            : await createRecord();

        return ArticleResponse.fromModel(created);
    }

    static async updateArticle(id, request) {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new NotFoundError(`Article with id ${id} not found`);
        }

        if (!ArticleRule.isEditable(existing)) {
            throw new ConflictError('Archived articles cannot be updated');
        }

        const data = ArticleRule.normalizeUpdateData(request);
        const updateRecord = async (transaction) => {
            return await this.repository.update(id, data, transaction ? { transaction } : {});
        };

        const updated = this.sequelize
            ? await this.sequelize.transaction(updateRecord)
            : await updateRecord();

        return ArticleResponse.fromModel(updated);
    }

    static async publishArticle(id) {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new NotFoundError(`Article with id ${id} not found`);
        }

        if (!ArticleRule.canPublish(existing)) {
            throw new ConflictError('Archived articles cannot be published');
        }

        const data = ArticleRule.applyPublish(existing);
        const updateRecord = async (transaction) => {
            return await this.repository.update(id, data, transaction ? { transaction } : {});
        };

        const updated = this.sequelize
            ? await this.sequelize.transaction(updateRecord)
            : await updateRecord();

        return ArticleResponse.fromModel(updated);
    }

    static async archiveArticle(id) {
        const existing = await this.repository.findById(id);

        if (!existing) {
            throw new NotFoundError(`Article with id ${id} not found`);
        }

        const updateRecord = async (transaction) => {
            return await this.repository.update(id, ArticleRule.applyArchive(existing), transaction ? { transaction } : {});
        };

        const updated = this.sequelize
            ? await this.sequelize.transaction(updateRecord)
            : await updateRecord();

        return ArticleResponse.fromModel(updated);
    }

    static async deleteArticle(id) {
        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new NotFoundError(`Article with id ${id} not found`);
        }

        return true;
    }

    static async seedSampleData() {
        const seed = async (transaction) => {
            return await this.repository.seedSampleData(transaction ? { transaction } : {});
        };

        return this.sequelize
            ? await this.sequelize.transaction(seed)
            : await seed();
    }
}

module.exports = ArticleService;
