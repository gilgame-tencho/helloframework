const { DataTypes } = require('sequelize');

let ArticleModel;

function defineArticleModel(sequelize) {
    return sequelize.models.Article || sequelize.define('Article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('draft', 'published', 'archived'),
            allowNull: false,
            defaultValue: 'draft'
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'articles',
        timestamps: true
    });
}

class ArticleRepository {
    static initialize(sequelize) {
        ArticleModel = defineArticleModel(sequelize);
    }

    static async findAll(filters = {}) {
        const where = {};

        if (filters.status) {
            where.status = filters.status;
        }

        return await ArticleModel.findAll({
            where,
            order: [['id', 'DESC']]
        });
    }

    static async findById(id) {
        return await ArticleModel.findByPk(id);
    }

    static async create(data, options = {}) {
        return await ArticleModel.create({
            title: data.title,
            body: data.body,
            status: data.status || 'draft',
            publishedAt: data.publishedAt ?? null
        }, options);
    }

    static async update(id, data, options = {}) {
        const article = await this.findById(id);

        if (!article) {
            return null;
        }

        return await article.update(data, options);
    }

    static async delete(id, options = {}) {
        const article = await this.findById(id);

        if (!article) {
            return false;
        }

        await article.destroy(options);
        return true;
    }

    static async seedSampleData(options = {}) {
        const samples = [
            {
                title: 'HelloBlog first draft',
                body: 'This draft article shows the minimum blog workflow.',
                status: 'draft',
                publishedAt: null
            },
            {
                title: 'Published architecture note',
                body: 'This published article demonstrates public content.',
                status: 'published',
                publishedAt: new Date('2026-01-01T00:00:00.000Z')
            },
            {
                title: 'Archived release memo',
                body: 'This archived article demonstrates immutable content.',
                status: 'archived',
                publishedAt: new Date('2025-12-01T00:00:00.000Z')
            }
        ];

        const articles = [];

        for (const sample of samples) {
            const [article] = await ArticleModel.findOrCreate({
                where: { title: sample.title },
                defaults: sample,
                ...options
            });
            articles.push(article);
        }

        return articles;
    }

    static getModel() {
        return ArticleModel;
    }
}

module.exports = ArticleRepository;
