const sequelize =
    require("./database");

// モデル読み込み
require("./models/Hello");

const Hello =
    require("./models/Hello");

async function setup() {

    try {

        await sequelize.sync();

        console.log(
            "Database setup complete."
        );

        await Hello.create({
            message: "Hello World"
        });

    } catch (err) {

        console.error(err);

    } finally {

        await sequelize.close();

    }
}

setup();