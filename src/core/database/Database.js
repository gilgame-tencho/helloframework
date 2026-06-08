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
    logging: true // ログを非表示にする場合はfalse
});

/**
 * データベース初期化
 * 全てのモデルを同期
 */
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection authenticated.');
        
        // モデル同期
        await sequelize.sync({ alter: false });
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
