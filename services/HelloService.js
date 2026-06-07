// services/HelloService.js

const HelloRepository =
    require("../repositories/HelloRepository");

exports.getMessage = async () => {

    const record =
        await HelloRepository.findLatest();

    return {
        message: record.message
    };
};