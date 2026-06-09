class HelloCategoryResponse {
    constructor(id, name, description = null) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static fromModel(model) {
        if (!model) {
            return null;
        }
        return new HelloCategoryResponse(model.id, model.name, model.description);
    }
}

class GetHelloResponse {
    constructor(id, message, category = null) {
        this.id = id;
        this.message = message;
        this.category = category;
    }

    static fromModel(model) {
        if (!model) {
            return null;
        }
        return new GetHelloResponse(
            model.id,
            model.message,
            HelloCategoryResponse.fromModel(model.category)
        );
    }
}

class CreateHelloRequest {
    constructor(message, categoryId = null) {
        this.message = message;
        this.categoryId = categoryId;
    }
}

class CreateHelloResponse {
    constructor(id, message, category = null) {
        this.id = id;
        this.message = message;
        this.category = category;
    }

    static fromModel(model) {
        return new CreateHelloResponse(
            model.id,
            model.message,
            HelloCategoryResponse.fromModel(model.category)
        );
    }
}

class HelloCategoryWithMessagesResponse {
    constructor(id, name, description, messages) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.messages = messages;
    }

    static fromModel(model) {
        return new HelloCategoryWithMessagesResponse(
            model.id,
            model.name,
            model.description,
            (model.messages || []).map((message) => GetHelloResponse.fromModel(message))
        );
    }
}

module.exports = {
    HelloCategoryResponse,
    HelloCategoryWithMessagesResponse,
    GetHelloResponse,
    CreateHelloRequest,
    CreateHelloResponse
};
