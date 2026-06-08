/**
 * Dependency Injection (DI) Setup
 * 
 * 依存性注入コンテナの設定
 */

const HelloRepository = require('../../features/hello/repository/HelloRepository');
const HelloService = require('../../features/hello/service/HelloService');
const HelloController = require('../../features/hello/controller/HelloController');

/**
 * DIコンテナの初期化
 * 
 * @param {Sequelize} sequelize - Sequelizeインスタンス
 */
function initializeDI(sequelize) {
    // Repositoryを初期化（Sequelizeインスタンスを注入）
    HelloRepository.initialize(sequelize);
    HelloService.initialize({
        repository: HelloRepository,
        sequelize
    });

    // Service と Controller はRepositoryに依存する
    // HelloService は HelloRepository を利用
    // HelloController は HelloService を利用

    console.log('Dependency Injection initialized.');
}

/**
 * Service インスタンスを取得（シングルトンパターン）
 * 
 * @param {string} serviceName - サービス名
 * @returns {Object} サービスインスタンス
 */
function getService(serviceName) {
    switch (serviceName) {
        case 'HelloService':
            return HelloService;
        default:
            throw new Error(`Service ${serviceName} not found`);
    }
}

/**
 * Controller インスタンスを取得（シングルトンパターン）
 * 
 * @param {string} controllerName - コントローラ名
 * @returns {Object} コントローラインスタンス
 */
function getController(controllerName) {
    switch (controllerName) {
        case 'HelloController':
            return HelloController;
        default:
            throw new Error(`Controller ${controllerName} not found`);
    }
}

module.exports = {
    initializeDI,
    getService,
    getController
};
