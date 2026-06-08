/**
 * Database Setup Script
 * 
 * データベースを初期化してサンプルデータを作成
 */

const { initializeDatabase, sequelize } = require('./core/database/Database');
const { initializeDI } = require('./core/di/DIContainer');
const HelloRepository = require('./features/hello/repository/HelloRepository');

/**
 * セットアップ実行
 */
async function setup() {
    try {
        // データベース初期化
        console.log('Initializing database...');
        await initializeDatabase();

        // DI初期化
        console.log('Initializing DI...');
        initializeDI(sequelize);

        // サンプルデータ作成
        console.log('Creating sample data...');
        const helloRecord = await HelloRepository.create({
            message: 'Hello World'
        });
        console.log('Sample data created:', helloRecord.toJSON());

        console.log('Setup completed successfully!');
    } catch (error) {
        console.error('Setup failed:', error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

// セットアップ実行
setup();
