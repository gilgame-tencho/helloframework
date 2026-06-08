# NodeJSバックエンドアーキテクチャ

## 1. 目的

本ドキュメントは、Node.js + Express + Socket.IO + Sequelize を用いた中規模システム向けバックエンドアーキテクチャを定義する。

本アーキテクチャでは、責務をレイヤごとに分離し、保守性・テスト容易性・AIによる実装分担を向上させることを目的とする。

---

# 2. アーキテクチャ概要

```text
Client
  ↓
HTTP / Socket.IO

Controller
  ↓

Application Service
  ↓

Repository
  ↓

ORM (Sequelize)
  ↓

SQLite / MySQL / PostgreSQL
```

各レイヤの責務を明確に分離する。

---

# 3. ディレクトリ構成

```text
src/
├─ init.js
├─ setup.js
├─ database.js
│
├─ controllers/
│  └─ HelloController.js
│
├─ services/
│  └─ HelloService.js
│
├─ repositories/
│  └─ HelloRepository.js
│
├─ models/
│  └─ Hello.js
│
└─ sockets/
   └─ SocketHandler.js
```

---

# 4. レイヤ定義

## Controller

### 役割

HTTPおよびSocket.IOイベントを受け付ける。

### 責務

* リクエスト受信
* パラメータ取得
* Service呼び出し
* レスポンス返却

### 行わないこと

* SQL実行
* DBアクセス
* 業務ロジック

### 例

```text
GET /hello
 ↓
HelloService.getMessage()
 ↓
JSON返却
```

---

## Application Service

### 役割

ユースケースを実装する。

### 責務

* 業務処理実行
* トランザクション管理
* Repository呼び出し
* 複数Repositoryの制御

### 例

```text
ポイント付与

ユーザー取得
 ↓
ポイント更新
 ↓
履歴登録
 ↓
通知送信
```

---

## Repository

### 役割

データアクセスを担当する。

### 責務

* データ取得
* データ登録
* データ更新
* データ削除

### 行わないこと

* 業務ロジック
* HTTP処理

### 例

```text
findById()
findLatest()
save()
delete()
```

---

## ORM

### 役割

オブジェクトとDBをマッピングする。

本構成では Sequelize を利用する。

### 責務

* SQL生成
* Model管理
* Transaction連携

---

## DB

### 役割

データ永続化

### 利用想定

#### 開発

```text
SQLite
```

#### 本番

```text
MySQL
PostgreSQL
```

---

# 5. リクエスト処理フロー

## GET /hello

```text
Client

 ↓

HelloController

 ↓

HelloService

 ↓

HelloRepository

 ↓

Hello Model

 ↓

SQLite

 ↓

Response
```

---

# 6. トランザクション管理方針

トランザクションは Service 層で管理する。

RepositoryはTransactionを受け取り、実行のみ行う。

---

## 推奨

```javascript
const tx =
  await sequelize.transaction();

try {

  await repositoryA.save(..., tx);

  await repositoryB.save(..., tx);

  await tx.commit();

} catch(err) {

  await tx.rollback();

}
```

---

## 非推奨

```javascript
Repository内でtransaction開始
```

トランザクション境界が不明瞭になるため。

---

# 7. Socket.IO方針

Socket.IOはControllerと同等レイヤとして扱う。

---

## 推奨構成

```text
Socket Event

 ↓

SocketHandler

 ↓

Service

 ↓

Repository

 ↓

DB
```

---

## 非推奨

```text
Socket Event

 ↓

Repository

 ↓

DB
```

業務ロジックが分散するため。

---

# 8. DB初期化方針

テーブル作成はアプリ起動と分離する。

---

## setup.js

目的

* テーブル作成
* 初期データ投入

実行

```bash
npm run setup
```

---

## init.js

目的

* HTTPサーバ起動
* Socket.IO起動

実行

```bash
npm start
```

---

# 9. 運用フロー

## 初回セットアップ

```bash
npm install

npm run setup
```

---

## アプリ起動

```bash
npm start
```

---

# 10. 将来拡張

本構成は以下への拡張を想定する。

## Domain Service追加

```text
Controller
 ↓

Application Service
 ↓

Domain Service
 ↓

Repository
```

ポイント計算やランク判定などの業務ルールを分離する。

---

## Migration導入

setup.jsによるテーブル作成から、

```text
sequelize-cli
```

によるMigration管理へ移行可能。

---

## DB変更

```text
SQLite
 ↓
MySQL
 ↓
PostgreSQL
```

Repositoryを変更せず移行可能。

---

# 11. 本アーキテクチャの目的

本構成の目的は以下である。

* 責務分離
* 保守性向上
* テスト容易性向上
* AI実装との親和性向上
* DB変更耐性向上
* 中規模システムへの拡張性確保

特にAI開発では、

* Controller
* Service
* Repository

単位で実装タスクを分割できるため、実装効率とレビュー効率の向上が期待できる。
