const { z } = require('zod');
const { ArticleRule } = require('../domain/ArticleRule');

const articleStatusSchema = z.enum(ArticleRule.getAllowedStatuses());

const createArticleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'title is required')
        .max(100, 'title must be 100 characters or less'),
    body: z
        .string()
        .trim()
        .min(1, 'body is required')
        .max(5000, 'body must be 5000 characters or less'),
    author: z
        .string()
        .trim()
        .max(100, 'author must be 100 characters or less')
        .optional()
        .nullable(),
    status: articleStatusSchema.optional()
});

const updateArticleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'title is required')
        .max(100, 'title must be 100 characters or less')
        .optional(),
    body: z
        .string()
        .trim()
        .min(1, 'body is required')
        .max(5000, 'body must be 5000 characters or less')
        .optional(),
    author: z
        .string()
        .trim()
        .max(100, 'author must be 100 characters or less')
        .optional()
        .nullable(),
    status: articleStatusSchema.optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'at least one field is required'
});

const listArticleSchema = z.object({
    status: articleStatusSchema.optional()
});

const idParamSchema = z.object({
    id: z.coerce.number().int().positive()
});

function validateCreateArticle(data) {
    return createArticleSchema.safeParse(data);
}

function validateUpdateArticle(data) {
    return updateArticleSchema.safeParse(data);
}

function validateListArticles(data) {
    return listArticleSchema.safeParse(data);
}

function validateIdParam(data) {
    return idParamSchema.safeParse(data);
}

module.exports = {
    validateCreateArticle,
    validateUpdateArticle,
    validateListArticles,
    validateIdParam,
    createArticleSchema,
    updateArticleSchema,
    listArticleSchema,
    idParamSchema
};
