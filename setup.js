// const Hello = sequelize.define(
//     "hello",
//     {
//         message: DataTypes.STRING
//     }
// );

const sequelize = require("./database");

async function start() {

    await sequelize.sync();

    server.listen(3000);
}

start();
