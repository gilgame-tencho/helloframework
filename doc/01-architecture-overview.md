# 01-architecture-overview.md

# Architecture Overview

## Purpose

本フレームワークは以下を目的とする。

* 中規模業務システム開発
* 生成AIを活用した高速開発
* 高い保守性
* 高いテスト容易性
* 将来的なSaaS展開

---

## Design Principles

### Separation of Concerns

各レイヤは責務を明確に分離する。

```text
Request
 ↓
Controller
 ↓
Validator
 ↓
DTO
 ↓
Service
 ↓
Domain
 ↓
Repository
 ↓
Database
```

---

### AI-Friendly Design

生成AIがコード生成しやすい構造を維持する。

禁止事項

* ControllerからRepository直接呼び出し
* ServiceからHTTPオブジェクト参照
* ServiceからExpress依存
* ServiceからSequelize直接利用

---

### Testability

全てのServiceはUnitTest可能であること。

RepositoryはDIにより差し替え可能とする。

---

### OpenAPI First

API仕様はOpenAPIを正とする。

```text
OpenAPI
 ↓
Controller
 ↓
Service
```

または

```text
Controller
 ↓
OpenAPI更新
```

のいずれかを必須とする。
