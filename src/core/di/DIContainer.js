const HelloRepository = require('../../features/hello/repository/HelloRepository');
const HelloService = require('../../features/hello/service/HelloService');
const HelloController = require('../../features/hello/controller/HelloController');
const ArticleRepository = require('../../features/blog/repository/ArticleRepository');
const ArticleService = require('../../features/blog/service/ArticleService');
const ArticleController = require('../../features/blog/controller/ArticleController');

function initializeDI(sequelize) {
    HelloRepository.initialize(sequelize);
    ArticleRepository.initialize(sequelize);

    HelloService.initialize({
        repository: HelloRepository,
        sequelize
    });

    ArticleService.initialize({
        repository: ArticleRepository,
        sequelize
    });

    console.log('Dependency Injection initialized.');
}

function getService(serviceName) {
    switch (serviceName) {
        case 'HelloService':
            return HelloService;
        case 'ArticleService':
            return ArticleService;
        default:
            throw new Error(`Service ${serviceName} not found`);
    }
}

function getController(controllerName) {
    switch (controllerName) {
        case 'HelloController':
            return HelloController;
        case 'ArticleController':
            return ArticleController;
        default:
            throw new Error(`Controller ${controllerName} not found`);
    }
}

module.exports = {
    initializeDI,
    getService,
    getController
};
