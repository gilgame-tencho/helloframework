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

例

```text
VA-CAP-001
VA-EP-001
VA-FEA-001
VA-ST-001
```

---

### 改善開発（MI）

| 種別 | コード |
|--------|--------|
| Bug | BUG |
| TechDebt | TD |
| Ops | OPS |
| Security | SEC |
| Task | TASK |

例

```text
MI-BUG-001
MI-TD-001
MI-OPS-001
MI-SEC-001
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

---

# 4. Task管理方針

Taskは採番対象としない。

TaskはGitHub Issueとして管理し、
GitHubが採番するIssue番号を利用する。

例

```text
#123 [Implement] ポイント付与API作成

#124 [Test] ポイント付与APIテスト追加

#125 [Document] API仕様更新
```

Taskは以下の種別を利用する。

| 種別            | 用途       |
| ------------- | -------- |
| Investigation | 調査       |
| Design        | 設計       |
| Implement     | 実装       |
| Refactor      | リファクタリング |
| Test          | テスト      |
| Document      | ドキュメント更新 |
| Review        | レビュー     |

GitHub Issueには親要素を明記する。

例

```text
Parent: VA-ST-001
Type: Implement
```

```text
Parent: MI-TD-001
Type: Refactor
```
