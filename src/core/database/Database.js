/**
 * Database Setup
 * 
 * Sequelizeインスタンスを作成・管理
 */

const { Sequelize } = require('sequelize');

// Sequelizeインスタンス作成
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
});

/**
 * データベース初期化
 * 全てのモデルを同期
 */
async function initializeDatabase(options = {}) {
    try {
        const syncOptions = {
            alter: false,
            force: false,
            ...options
        };

        await sequelize.authenticate();
        console.log('Database connection authenticated.');
        
        // モデル同期
        await sequelize.sync(syncOptions);
        console.log('Database models synchronized.');
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}

/**
 * データベースクローズ
 */
async function closeDatabase() {
    await sequelize.close();
}

module.exports = {
    sequelize,
    initializeDatabase,
    closeDatabase
};
