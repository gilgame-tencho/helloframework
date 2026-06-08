/**
 * HelloDTO
 * 
 * Hello機能のDTOを定義
 */

/**
 * GetHelloResponse
 * Hello取得レスポンス
 */
class GetHelloResponse {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    static fromModel(model) {
        if (!model) {
            return null;
        }
        return new GetHelloResponse(model.id, model.message);
    }
}

/**
 * CreateHelloRequest
 * Hello作成リクエスト
 */
class CreateHelloRequest {
    constructor(message) {
        this.message = message;
    }
}

/**
 * CreateHelloResponse
 * Hello作成レスポンス
 */
class CreateHelloResponse {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }

    static fromModel(model) {
        return new CreateHelloResponse(model.id, model.message);
    }
}

module.exports = {
    GetHelloResponse,
    CreateHelloRequest,
    CreateHelloResponse
};
