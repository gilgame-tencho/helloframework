/**
 * Application Errors
 * 
 * アプリケーション固有のエラークラスを定義
 */

/**
 * ApplicationError基底クラス
 */
class ApplicationError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * ValidationError
 * バリデーション失敗時のエラー
 */
class ValidationError extends ApplicationError {
    constructor(message, details = []) {
        super(message, 400);
        this.details = details;
    }
}

/**
 * NotFoundError
 * リソースが見つからない場合のエラー
 */
class NotFoundError extends ApplicationError {
    constructor(message) {
        super(message, 404);
    }
}

/**
 * ConflictError
 * リソース競合時のエラー
 */
class ConflictError extends ApplicationError {
    constructor(message) {
        super(message, 409);
    }
}

/**
 * BusinessRuleError
 * ビジネスルール違反時のエラー
 */
class BusinessRuleError extends ApplicationError {
    constructor(message) {
        super(message, 422);
    }
}

module.exports = {
    ApplicationError,
    ValidationError,
    NotFoundError,
    ConflictError,
    BusinessRuleError
};
