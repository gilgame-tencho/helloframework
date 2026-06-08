# AI Development Rules

## Priority

1. Architecture Documents
2. OpenAPI
3. Existing Source

の順で従うこと

---

## Prohibited

- レイヤ違反
- 既存命名規則破壊
- Repository経由しないDBアクセス

---

## Required

新機能追加時

- Controller
- Validator
- DTO
- Service
- Domain
- Repository
- Test

を同時作成すること

---

## Required Output

変更概要

影響範囲

追加ファイル一覧

テスト結果

を報告すること