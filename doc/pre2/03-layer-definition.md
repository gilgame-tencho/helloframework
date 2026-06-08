# 03-layer-definition.md

# Layer Definition

## Controller

責務

* HTTP受信
* DTO生成
* Service呼び出し
* HTTP返却

禁止

* SQL
* ビジネスロジック
* Transaction

---

## Validator

責務

* 入力検証

推奨ライブラリ

* zod

---

## DTO

責務

* API入出力定義

例

```javascript
CreateUserRequest
CreateUserResponse
```

---

## Service

責務

* ユースケース実装
* Transaction管理
* Domain呼び出し

禁止

* Express参照
* req/res利用

---

## Domain

責務

* 業務ルール

例

```text
PointRule
CouponRule
RankRule
```

Serviceから利用される。

---

## Repository

責務

* DBアクセス

許可

```javascript
Sequelize
```

禁止

* ビジネスロジック

---

## Model

責務

* ORM定義

禁止

* 業務ルール
