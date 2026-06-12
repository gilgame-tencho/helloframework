# Hello Framework

## HelloBlog

HelloBlog extends the original Hello sample with a blog Article feature. The `hello` feature remains as the minimal sample, while `blog` provides a richer feature-first example with controller, validator, DTO, service, domain rule, repository, Sequelize model, setup seed data, OpenAPI, and tests.

Article fields:

- `id`
- `title`
- `body`
- `status`: `draft`, `published`, or `archived`
- `publishedAt`
- `createdAt`
- `updatedAt`

Article behavior:

- Creating an article always stores it as `draft`, even if `status` is supplied.
- Publishing sets `status` to `published` and fills `publishedAt`.
- Publishing an already published article is allowed.
- Archived articles cannot be updated or published.
- Article lists can be filtered with `?status=draft`, `?status=published`, or `?status=archived`.

Setup also synchronizes the `articles` table and inserts sample Article records for draft, published, and archived states.

Article API examples:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/articles"
Invoke-RestMethod -Uri "http://localhost:3000/api/articles?status=published"
Invoke-RestMethod -Uri "http://localhost:3000/api/articles" -Method Post -ContentType "application/json" -Body '{"title":"HelloBlog","body":"First article body"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/articles/1/publish" -Method Patch
Invoke-RestMethod -Uri "http://localhost:3000/api/articles/1/archive" -Method Patch
```

HelloBlog screen check:

```text
http://localhost:3000/articles
```

Available screens:

| Path | Description |
| --- | --- |
| `/articles` | Article list with status filter |
| `/articles/new` | New article form |
| `/articles/:id` | Article detail and edit form |

Article endpoints:

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/articles` | Get articles, optionally filtered by `status` |
| GET | `/api/articles/:id` | Get article by ID |
| POST | `/api/articles` | Create draft article |
| PUT | `/api/articles/:id` | Update article |
| PATCH | `/api/articles/:id/publish` | Publish article |
| PATCH | `/api/articles/:id/archive` | Archive article |
| DELETE | `/api/articles/:id` | Delete article |

The legacy Hello routes are kept, and `/api/hello` is available as an API alias for the latest Hello message.

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
