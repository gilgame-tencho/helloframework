/**
 * HelloDomain
 * 
 * Hello機能のドメインロジックを実装
 * 業務ルールはここに集約する
 */

/**
 * HelloRuleクラス
 * Hello関連の業務ルールを実装
 */
class HelloRule {
    /**
     * メッセージが有効かチェック
     * 
     * @param {string} message - チェック対象のメッセージ
     * @returns {boolean} 有効な場合true
     */
    static isValidMessage(message) {
        if (!message || typeof message !== 'string') {
            return false;
        }
        if (message.trim().length === 0) {
            return false;
        }
        if (message.length > 255) {
            return false;
        }
        return true;
    }

    /**
     * メッセージをフォーマット
     * 
     * @param {string} message - フォーマット対象のメッセージ
     * @returns {string} フォーマット済みメッセージ
     */
    static formatMessage(message) {
        return message.trim();
    }

    /**
     * Helloレコードが作成可能かチェック
     * 
     * @param {Object} data - チェック対象データ
     * @returns {boolean} 作成可能な場合true
     */
    static canCreate(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        return this.isValidMessage(data.message);
    }
}

module.exports = HelloRule;
