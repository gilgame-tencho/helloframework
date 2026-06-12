/**
 * Main Application Entry Point
 * 
 * アプリケーション起動ポイント
 */

const http = require('http');
const { Server } = require('socket.io');
const { createApp } = require('./core/config/AppConfig');
const { initializeDatabase, sequelize } = require('./core/database/Database');
const { initializeDI } = require('./core/di/DIContainer');
const HelloController = require('./features/hello/controller/HelloController');
const ArticleController = require('./features/blog/controller/ArticleController');

// ポート設定
const PORT = process.env.PORT || 3000;

/**
 * アプリケーション初期化・起動
 */
async function startServer() {
    try {
        
        // 1. Expressアプリケーション作成
        const app = createApp();

        // 2. DI初期化
        initializeDI(sequelize);

        // 3. データベース初期化
        await initializeDatabase();
        console.log('Database initialized.');

        // 4. HTTPサーバー作成
        const server = http.createServer(app);
        const io = new Server(server);

        // 5. ルート設定
        setupRoutes(app);

        // 6. Socket.IO設定
        setupSocket(io);

        // 7. エラーハンドリング
        setupErrorHandling(app);

        // 8. サーバー起動
        server.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });

        // グレースフルシャットダウン
        process.on('SIGINT', async () => {
            console.log('Shutting down gracefully...');
            server.close();
            await sequelize.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

/**
 * ルート設定
 * 
 * @param {Express.Application} app - Expressアプリケーション
 */
function setupRoutes(app) {
    // Hello API
    setupHelloRoutes(app, '/hello');
    setupHelloRoutes(app, '/api/hello');

    // Article API
    app.get('/api/articles', (req, res) => ArticleController.getArticles(req, res));
    app.get('/api/articles/:id', (req, res) => ArticleController.getArticleById(req, res));
    app.post('/api/articles', (req, res) => ArticleController.createArticle(req, res));
    app.put('/api/articles/:id', (req, res) => ArticleController.updateArticle(req, res));
    app.patch('/api/articles/:id/publish', (req, res) => ArticleController.publishArticle(req, res));
    app.patch('/api/articles/:id/archive', (req, res) => ArticleController.archiveArticle(req, res));
    app.delete('/api/articles/:id', (req, res) => ArticleController.deleteArticle(req, res));

    // ヘルスチェックエンドポイント
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok' });
    });

    // 404処理
    app.use((req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
}

function setupHelloRoutes(app, basePath) {
    app.get(basePath, (req, res) => HelloController.getLatestMessage(req, res));
    app.get(`${basePath}/all`, (req, res) => HelloController.getAllMessages(req, res));
    app.get(`${basePath}/categories`, (req, res) => HelloController.getCategories(req, res));
    app.get(`${basePath}/categories/:id/messages`, (req, res) => HelloController.getCategoryMessages(req, res));
    app.get(`${basePath}/:id`, (req, res) => HelloController.getMessageById(req, res));
    app.post(basePath, (req, res) => HelloController.createMessage(req, res));
}

/**
 * Socket.IO設定
 * 
 * @param {Socket.IO.Server} io - Socket.IOサーバー
 */
function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.emit('message', 'Welcome to Hello Framework');

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

/**
 * エラーハンドリング設定
 * 
 * @param {Express.Application} app - Expressアプリケーション
 */
function setupErrorHandling(app) {
    // エラーハンドリングミドルウェア
    app.use((err, req, res, next) => {
        console.error('Unhandled error:', err);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// サーバー起動
if (require.main === module) {
    startServer();
}

module.exports = { startServer };
