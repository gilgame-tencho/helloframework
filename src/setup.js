const { initializeDatabase, sequelize } = require('./core/database/Database');
const { initializeDI } = require('./core/di/DIContainer');
const HelloService = require('./features/hello/service/HelloService');
const ArticleService = require('./features/blog/service/ArticleService');

async function setup() {
    try {
        console.log('Initializing DI...');
        initializeDI(sequelize);

        console.log('Initializing database...');
        await initializeDatabase({ alter: true });

        console.log('Creating sample data...');
        const result = await HelloService.seedSampleData();
        const articles = await ArticleService.seedSampleData();
        console.log('Sample data created:', {
            categories: result.categories.length,
            messages: result.messages.length,
            articles: articles.length
        });

        console.log('Setup completed successfully!');
    } catch (error) {
        console.error('Setup failed:', error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
        process.exit(process.exitCode || 0);
    }
}

setup();
