/**
 * HelloValidator
 * 
 * Hello機能の入力検証を実施
 */

const { z } = require('zod');

/**
 * GetHelloのバリデーションスキーマ
 */
const getHelloSchema = z.object({
    // リクエストボディなし、または特定のパラメータが必要な場合はここに定義
});

/**
 * CreateHelloのバリデーションスキーマ
 */
const createHelloSchema = z.object({
    message: z
        .string()
        .min(1, 'メッセージは必須です')
        .max(255, 'メッセージは255文字以内です')
});

/**
 * GetHelloの入力検証
 * 
 * @param {Object} data - バリデーション対象データ
 * @returns {Object} バリデーション結果
 */
function validateGetHello(data = {}) {
    return getHelloSchema.safeParse(data);
}

/**
 * CreateHelloの入力検証
 * 
 * @param {Object} data - バリデーション対象データ
 * @returns {Object} バリデーション結果
 */
function validateCreateHello(data) {
    return createHelloSchema.safeParse(data);
}

module.exports = {
    validateGetHello,
    validateCreateHello,
    getHelloSchema,
    createHelloSchema
};
