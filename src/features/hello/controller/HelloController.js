/**
 * HelloController
 * 
 * Hello機能のHTTPリクエスト処理を担当
 */

const HelloService = require('../service/HelloService');
const { validateCreateHello, validateIdParam } = require('../validator/HelloValidator');
const { CreateHelloRequest } = require('../dto/HelloDTO');

/**
 * HelloControllerクラス
 * HTTPエンドポイントを実装
 */
class HelloController {
    /**
     * GET /hello
     * 最新のHelloメッセージを取得
     * 
     * @param {Express.Request} req - リクエスト
     * @param {Express.Response} res - レスポンス
     */
    static async getLatestMessage(req, res) {
        try {
            const response = await HelloService.getLatestMessage();
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * GET /hello/all
     * 全てのHelloメッセージを取得
     * 
     * @param {Express.Request} req - リクエスト
     * @param {Express.Response} res - レスポンス
     */
    static async getAllMessages(req, res) {
        try {
            const response = await HelloService.getAllMessages();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategories(req, res) {
        try {
            const response = await HelloService.getCategories();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategoryMessages(req, res) {
        try {
            const validation = validateIdParam(req.params);

            if (!validation.success) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: validation.error.errors
                });
            }

            const response = await HelloService.getCategoryWithMessages(validation.data.id);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * GET /hello/:id
     * IDでHelloメッセージを取得
     * 
     * @param {Express.Request} req - リクエスト
     * @param {Express.Response} res - レスポンス
     */
    static async getMessageById(req, res) {
        try {
            const validation = validateIdParam(req.params);

            if (!validation.success) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: validation.error.errors
                });
            }

            const response = await HelloService.getMessageById(validation.data.id);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * POST /hello
     * Helloメッセージを作成
     * 
     * @param {Express.Request} req - リクエスト
     * @param {Express.Response} res - レスポンス
     */
    static async createMessage(req, res) {
        try {
            // バリデーション実施
            const validation = validateCreateHello(req.body);
            
            if (!validation.success) {
                return res.status(400).json({ 
                    error: 'Validation failed',
                    details: validation.error.errors 
                });
            }

            // DTOを生成
            const request = new CreateHelloRequest(
                validation.data.message,
                validation.data.categoryId ?? null
            );

            // Serviceを呼び出し
            const response = await HelloService.createMessage(request);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HelloController;
