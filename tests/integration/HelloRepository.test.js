/**
 * Hello Integration Tests
 * 
 * HelloRepository と Database の統合テスト
 */

const { Sequelize } = require('sequelize');
const HelloRepository = require('../../src/features/hello/repository/HelloRepository');

/**
 * インメモリSQLiteデータベース作成
 */
async function createTestDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    // HelloRepositoryを初期化
    HelloRepository.initialize(sequelize);

    // モデル同期
    await sequelize.sync();

    return sequelize;
}

/**
 * テストスイート：HelloRepository
 */
describe('HelloRepository Integration Tests', () => {
    let sequelize = null;

    before(async () => {
        sequelize = await createTestDatabase();
    });

    after(async () => {
        if (sequelize) {
            await sequelize.close();
        }
    });

    it('should create and retrieve hello message', async () => {
        console.log('Test: Create and retrieve hello message');
        
        // 作成テスト
        const created = await HelloRepository.create({ message: 'Test Message' });
        console.assert(created !== null, 'Message should be created');
        console.assert(created.message === 'Test Message', 'Message content should match');

        // 取得テスト
        const retrieved = await HelloRepository.findLatest();
        console.assert(retrieved !== null, 'Message should be retrieved');
        console.assert(retrieved.message === 'Test Message', 'Retrieved message should match');
    });

    it('should find message by id', async () => {
        console.log('Test: Find message by id');
        
        const created = await HelloRepository.create({ message: 'Test Message 2' });
        const retrieved = await HelloRepository.findById(created.id);
        
        console.assert(retrieved !== null, 'Message should be found by id');
        console.assert(retrieved.id === created.id, 'IDs should match');
    });

    it('should return null for non-existent id', async () => {
        console.log('Test: Return null for non-existent id');
        
        const retrieved = await HelloRepository.findById(9999);
        console.assert(retrieved === null, 'Should return null for non-existent id');
    });
});

console.log('Hello Integration Tests setup completed');
