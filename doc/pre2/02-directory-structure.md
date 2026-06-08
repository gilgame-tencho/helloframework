# 02-directory-structure.md

# Standard Directory Structure

```text
src/

core/
 ├─ config/
 ├─ database/
 ├─ logger/
 ├─ middleware/
 └─ di/

features/

 ├─ auth/
 │   ├─ controller/
 │   ├─ service/
 │   ├─ domain/
 │   ├─ repository/
 │   ├─ dto/
 │   ├─ validator/
 │   └─ test/
 │
 ├─ user/
 ├─ store/
 ├─ point/
 ├─ coupon/
 └─ notification/

shared/
 ├─ errors/
 ├─ constants/
 ├─ utils/
 └─ types/

docs/
 ├─ openapi/
 └─ architecture/

tests/
 ├─ unit/
 ├─ integration/
 └─ e2e/
```

---

## Feature First Rule

レイヤ単位ではなく機能単位で管理する。

禁止

```text
controllers/
services/
repositories/
```

推奨

```text
features/
 ├─ user/
 ├─ store/
 └─ point/
```

---

## Benefits

* AIが対象機能を特定しやすい
* 変更範囲が明確
* 機能削除が容易
* モジュール化しやすい
