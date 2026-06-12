# 3. 採番体系

## 基本形式

```text
<分類>-<種別>-<連番>
```

例

```text
VA-FEA-001
VA-ST-001

MI-BUG-001
MI-TD-001

UI-U-001
```

---

## 分類コード

| 分類 | コード |
|--------|--------|
| 価値開発 | VA |
| 改善開発 | MI |
| 画面設計 | UI |
| API設計 | API |
| DB設計 | DB |
| バッチ設計 | BT |

---

## 種別コード

### 価値開発（VA）

| 種別 | コード |
|--------|--------|
| Capability | CAP |
| Epic | EP |
| Feature | FEA |
| Story | ST |
| Task | TASK |

例

```text
VA-CAP-001
VA-EP-001
VA-FEA-001
VA-ST-001
VA-TASK-001
```

---

### 改善開発（MI）

| 種別 | コード |
|--------|--------|
| Bug | BUG |
| TechDebt | TD |
| Refactor | RF |
| Ops | OPS |
| Task | TASK |

例

```text
MI-BUG-001
MI-TD-001
MI-RF-001
MI-OPS-001
MI-TASK-001
```

---

### 画面設計（UI）

| 種別 | コード |
|--------|--------|
| Userアプリ | U |
| Shopアプリ | S |
| Adminアプリ | A |

例

```text
UI-U-001
UI-S-001
UI-A-001
```

---

### API設計

```text
API-001
```

---

### DB設計

| 種別 | コード |
|--------|--------|
| Table | TBL |
| View | VW |

例

```text
DB-TBL-001
DB-VW-001
```

---

### バッチ設計

```text
BT-001
```