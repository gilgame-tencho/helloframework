# helloframework

Node.js + Express + Socket.IO + ORM（例：Sequelize）構成のハローアプリ。

## ディレクトリ構成

src/
├─ init.js
├─ controllers/
│  └─ HelloController.js
├─ services/
│  └─ HelloService.js
├─ repositories/
│  └─ HelloRepository.js
├─ models/
│  └─ Hello.js
└─ database.js

## 処理の流れ

HTTP Request

GET /hello

    ↓

HelloController

    ↓

HelloService

    ↓

HelloRepository

    ↓

Hello Model(ORM)

    ↓

DB