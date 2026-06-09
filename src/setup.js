const { initializeDatabase, sequelize } = require('./core/database/Database');
const { initializeDI } = require('./core/di/DIContainer');
const HelloService = require('./features/hello/service/HelloService');

async function setup() {
    try {
        console.log('Initializing DI...');
        initializeDI(sequelize);

        console.log('Initializing database...');
        await initializeDatabase({ alter: true });

        console.log('Creating sample data...');
        const result = await HelloService.seedSampleData();
        console.log('Sample data created:', {
            categories: result.categories.length,
            messages: result.messages.length
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
