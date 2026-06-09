const HelloRepository = require('../repository/HelloRepository');
const HelloRule = require('../domain/HelloRule');
const {
    CreateHelloResponse,
    GetHelloResponse,
    HelloCategoryResponse,
    HelloCategoryWithMessagesResponse
} = require('../dto/HelloDTO');

class HelloService {
    static repository = HelloRepository;
    static sequelize = null;

    static initialize({ repository = HelloRepository, sequelize = null } = {}) {
        this.repository = repository;
        this.sequelize = sequelize;
    }

    static async getLatestMessage() {
        const record = await this.repository.findLatest();

        if (!record) {
            throw new Error('No hello message found');
        }

        return GetHelloResponse.fromModel(record);
    }

    static async getAllMessages() {
        const records = await this.repository.findAll();
        return records.map((record) => GetHelloResponse.fromModel(record));
    }

    static async getMessageById(id) {
        const record = await this.repository.findById(id);

        if (!record) {
            throw new Error(`Hello message with id ${id} not found`);
        }

        return GetHelloResponse.fromModel(record);
    }

    static async getCategories() {
        const records = await this.repository.findCategories();
        return records.map((record) => HelloCategoryResponse.fromModel(record));
    }

    static async getCategoryWithMessages(categoryId) {
        const record = await this.repository.findCategoryWithMessages(categoryId);

        if (!record) {
            throw new Error(`Hello category with id ${categoryId} not found`);
        }

        return HelloCategoryWithMessagesResponse.fromModel(record);
    }

    static async createMessage(request) {
        if (!HelloRule.canCreate(request)) {
            throw new Error('Invalid message data');
        }

        const formattedMessage = HelloRule.formatMessage(request.message);

        const createRecord = async (transaction) => {
            if (request.categoryId) {
                const category = await this.repository.findCategoryById(request.categoryId);
                if (!category) {
                    throw new Error(`Hello category with id ${request.categoryId} not found`);
                }
            }

            return await this.repository.create({
                message: formattedMessage,
                categoryId: request.categoryId
            }, transaction ? { transaction } : {});
        };

        const created = this.sequelize
            ? await this.sequelize.transaction(createRecord)
            : await createRecord();
        const record = await this.repository.findById(created.id);

        return CreateHelloResponse.fromModel(record);
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

module.exports = HelloService;
