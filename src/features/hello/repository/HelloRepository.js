const { DataTypes } = require('sequelize');

let sequelize;
let HelloModel;
let HelloCategoryModel;

class HelloRepository {
    static initialize(db) {
        sequelize = db;

        HelloCategoryModel = sequelize.models.HelloCategory || sequelize.define('HelloCategory', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(80),
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            timestamps: false,
            tableName: 'hello_categories'
        });

        HelloModel = sequelize.models.Hello || sequelize.define('Hello', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            message: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'category_id',
                references: {
                    model: HelloCategoryModel,
                    key: 'id'
                }
            }
        }, {
            timestamps: false,
            tableName: 'hello'
        });

        if (!HelloModel.associations.category) {
            HelloModel.belongsTo(HelloCategoryModel, {
                as: 'category',
                foreignKey: 'categoryId'
            });
        }

        if (!HelloCategoryModel.associations.messages) {
            HelloCategoryModel.hasMany(HelloModel, {
                as: 'messages',
                foreignKey: 'categoryId'
            });
        }
    }

    static async findLatest() {
        return await HelloModel.findOne({
            include: this.getCategoryInclude(),
            order: [['id', 'DESC']]
        });
    }

    static async findById(id) {
        return await HelloModel.findByPk(id, {
            include: this.getCategoryInclude()
        });
    }

    static async findAll() {
        return await HelloModel.findAll({
            include: this.getCategoryInclude(),
            order: [['id', 'DESC']]
        });
    }

    static async findAllWithCategory() {
        return await this.findAll();
    }

    static async findCategories() {
        return await HelloCategoryModel.findAll({
            order: [['id', 'ASC']]
        });
    }

    static async findCategoryById(id) {
        return await HelloCategoryModel.findByPk(id);
    }

    static async findCategoryByName(name) {
        return await HelloCategoryModel.findOne({
            where: { name }
        });
    }

    static async findCategoryWithMessages(id) {
        return await HelloCategoryModel.findByPk(id, {
            include: [{
                model: HelloModel,
                as: 'messages',
                include: this.getCategoryInclude(),
                separate: true,
                order: [['id', 'ASC']]
            }]
        });
    }

    static async create(data, options = {}) {
        return await HelloModel.create({
            message: data.message,
            categoryId: data.categoryId ?? null
        }, options);
    }

    static async createCategory(data, options = {}) {
        return await HelloCategoryModel.create({
            name: data.name,
            description: data.description ?? null
        }, options);
    }

    static async findOrCreateCategory(data, options = {}) {
        const [category] = await HelloCategoryModel.findOrCreate({
            where: { name: data.name },
            defaults: {
                description: data.description ?? null
            },
            ...options
        });

        return category;
    }

    static async seedSampleData(options = {}) {
        const categories = [
            {
                name: 'system',
                description: 'Framework and system messages',
                messages: ['Hello Framework', 'System health is ready']
            },
            {
                name: 'user',
                description: 'User-facing sample messages',
                messages: ['Welcome user', 'Profile setup completed']
            },
            {
                name: 'operation',
                description: 'Operational workflow samples',
                messages: ['Job accepted', 'Notification queued']
            }
        ];

        const createdCategories = [];
        const createdMessages = [];

        for (const categoryData of categories) {
            const category = await this.findOrCreateCategory(categoryData, options);
            createdCategories.push(category);

            for (const message of categoryData.messages) {
                const exists = await HelloModel.findOne({
                    where: {
                        message,
                        categoryId: category.id
                    },
                    ...options
                });

                if (!exists) {
                    const created = await this.create({
                        message,
                        categoryId: category.id
                    }, options);
                    createdMessages.push(created);
                }
            }
        }

        return {
            categories: createdCategories,
            messages: createdMessages
        };
    }

    static async update(id, data, options = {}) {
        const record = await this.findById(id);
        if (!record) {
            return null;
        }
        return await record.update(data, options);
    }

    static async delete(id, options = {}) {
        const record = await this.findById(id);
        if (!record) {
            return false;
        }
        await record.destroy(options);
        return true;
    }

    static getModel() {
        return HelloModel;
    }

    static getCategoryModel() {
        return HelloCategoryModel;
    }

    static getCategoryInclude() {
        return {
            model: HelloCategoryModel,
            as: 'category'
        };
    }
}

module.exports = HelloRepository;
