/**
 * HelloService
 * 
 * Hello機能のビジネスロジック（ユースケース）を実装
 */

const HelloRepository = require('../repository/HelloRepository');
const HelloRule = require('../domain/HelloRule');
const { CreateHelloResponse, GetHelloResponse } = require('../dto/HelloDTO');

/**
 * HelloServiceクラス
 * ユースケースを実装
 */
class HelloService {
    /**
     * 最新のHelloメッセージを取得
     * 
     * @returns {Promise<GetHelloResponse>} Helloレスポンス
     * @throws {Error} レコードが見つからない場合
     */
    static async getLatestMessage() {
        const record = await HelloRepository.findLatest();
        
        if (!record) {
            throw new Error('No hello message found');
        }

        return GetHelloResponse.fromModel(record);
    }

    /**
     * 全てのHelloメッセージを取得
     * 
     * @returns {Promise<Array<GetHelloResponse>>} Helloレスポンス配列
     */
    static async getAllMessages() {
        const records = await HelloRepository.findAll();
        return records.map(record => GetHelloResponse.fromModel(record));
    }

    /**
     * Helloメッセージを作成
     * 
     * @param {CreateHelloRequest} request - 作成リクエスト
     * @returns {Promise<CreateHelloResponse>} 作成レスポンス
     * @throws {Error} バリデーション失敗時
     */
    static async createMessage(request) {
        // ドメインルールのチェック
        if (!HelloRule.canCreate(request)) {
            throw new Error('Invalid message data');
        }

        // メッセージフォーマット
        const formattedMessage = HelloRule.formatMessage(request.message);

        // DBへ保存
        const record = await HelloRepository.create({
            message: formattedMessage
        });

        return CreateHelloResponse.fromModel(record);
    }

    /**
     * IDでHelloメッセージを取得
     * 
     * @param {number} id - メッセージID
     * @returns {Promise<GetHelloResponse>} Helloレスポンス
     * @throws {Error} レコードが見つからない場合
     */
    static async getMessageById(id) {
        const record = await HelloRepository.findById(id);
        
        if (!record) {
            throw new Error(`Hello message with id ${id} not found`);
        }

        return GetHelloResponse.fromModel(record);
    }
}

module.exports = HelloService;
