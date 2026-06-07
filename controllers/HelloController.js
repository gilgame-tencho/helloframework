// controllers/HelloController.js

const HelloService = require("../services/HelloService");

exports.hello = async (req, res) => {

    const result = await HelloService.getMessage();

    res.json(result);
};