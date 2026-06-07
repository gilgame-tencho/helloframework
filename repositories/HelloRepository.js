// repositories/HelloRepository.js

const Hello = require("../models/Hello");

exports.findLatest = async () => {

    return await Hello.findOne({
        order: [["id", "DESC"]]
    });
};