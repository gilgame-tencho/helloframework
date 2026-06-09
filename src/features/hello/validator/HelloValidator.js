const { z } = require('zod');

const getHelloSchema = z.object({});

const createHelloSchema = z.object({
    message: z
        .string()
        .min(1, 'message is required')
        .max(255, 'message must be 255 characters or less'),
    categoryId: z.number().int().positive().optional()
});

const idParamSchema = z.object({
    id: z.coerce.number().int().positive()
});

function validateGetHello(data = {}) {
    return getHelloSchema.safeParse(data);
}

function validateCreateHello(data) {
    return createHelloSchema.safeParse(data);
}

function validateIdParam(data) {
    return idParamSchema.safeParse(data);
}

module.exports = {
    validateGetHello,
    validateCreateHello,
    validateIdParam,
    getHelloSchema,
    createHelloSchema,
    idParamSchema
};
