# Hello Framework

Hello Framework は、Node.js / Express / Sequelize / SQLite を使ったバックエンドアプリケーションのサンプル実装です。

アーキテクチャは feature first 構成を採用し、Controller、Validator、DTO、Service、Domain、Repository の責務を分離しています。

## 主な技術

- Node.js
- Express
- Socket.IO
- Sequelize
- SQLite
- Zod
- Node.js 標準テストランナー

## セットアップ

### 1. 依存関係をインストール

```bash
npm install
```

### 2. データベースを初期化

SQLite の `database.sqlite` を利用します。初期化とサンプルデータ作成は以下で実行します。

```bash
npm run setup
```

セットアップでは `hello_categories` と `hello` テーブルを同期し、カテゴリ3件とメッセージ6件のサンプルデータを登録します。

## 起動方法

```bash
npm start
```

デフォルトでは `http://localhost:3000` で起動します。

ポートを変更する場合は `PORT` 環境変数を指定します。

PowerShell:

```powershell
$env:PORT=3001
npm start
```

cmd:

```bat
set PORT=3001
npm start
```

## 動作確認

起動後、以下のエンドポイントで確認できます。

```bash
curl http://localhost:3000/health
```

レスポンス例:

```json
{
  "status": "ok"
}
```

Hello メッセージを登録:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello" -Method Post -ContentType "application/json" -Body '{"message":"Hello World"}'
```

最新の Hello メッセージを取得:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/hello"
```

## API

| Method | Path | 説明 |
| --- | --- | --- |
| GET | `/health` | ヘルスチェック |
| GET | `/hello` | 最新のHelloメッセージを取得 |
| GET | `/hello/all` | 全Helloメッセージを取得 |
| GET | `/hello/categories` | Helloカテゴリ一覧を取得 |
| GET | `/hello/categories/:id/messages` | カテゴリと紐づくHelloメッセージを取得 |
| GET | `/hello/:id` | ID指定でHelloメッセージを取得 |
| POST | `/hello` | Helloメッセージを作成 |

OpenAPI 定義は [src/docs/openapi/openapi.yaml](src/docs/openapi/openapi.yaml) にあります。

## テスト

全テストを実行:

```bash
npm test
```

Unit test のみ:

```bash
npm run test:unit
```

Integration test のみ:

```bash
npm run test:integration
```

## ディレクトリ構成

```text
src/
  core/
    config/
    database/
    di/
  docs/
    openapi/
  features/
    hello/
      controller/
      domain/
      dto/
      repository/
      service/
      validator/
  shared/
    errors/
tests/
  unit/
  integration/
doc/
  01-architecture-overview.md
  02-directory-structure.md
  03-layer-definition.md
  04-domain-design.md
  05-api-and-dto.md
  06-validation.md
  07-transaction-policy.md
  08-test-strategy.md
  09-ai-development-rules.md
```

## 処理の流れ

```text
HTTP Request
  -> Controller
  -> Validator
  -> DTO
  -> Service
  -> Domain
  -> Repository
  -> Database
```

Repository はDBアクセスのみを担当し、業務ルールは Domain、ユースケース制御とtransaction管理は Service に置きます。

## 補足

- DBログを出したい場合は `DB_LOGGING=true` を指定します。
- `database.sqlite` はローカル開発用のSQLiteファイルです。
- アーキテクチャ方針は `doc/` 配下のドキュメントを正とします。
