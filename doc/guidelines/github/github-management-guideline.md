# GitHub Management Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける GitHub の管理方式を定義する。

GitHub は単なるソースコード管理ツールではなく、Story・Task・Implementation を管理し、Featureとのトレーサビリティを維持するための実行管理基盤として利用する。

本ガイドラインにより以下を実現する。

* Story管理の統一
* Task管理の統一
* 実装状況の可視化
* Featureとのトレーサビリティ維持
* AI間の成果物連携
* 継続的改善

本ドキュメントは、人間および生成AIが共通認識を持つための正本とする。

---

# 2. 基本方針

## 2.1 GitHubは実行管理を担当する

GitHubでは以下を管理する。

```text
Story
Task
Implementation
Pull Request
```

---

GitHubでは以下を管理しない。

```text
Vision
Goal
Capability
Epic
Feature
MaintenanceIssue
```

これらはリポジトリ内ドキュメントで管理する。

---

## 2.2 GitHub Issueを正本とする

StoryおよびTaskの正本はGitHub Issueとする。

生成AIはStoryやTaskをドキュメント化してはならない。

---

## 2.3 トレーサビリティを維持する

以下を双方向で追跡可能な状態を維持する。

```text
Feature
 ↓
Story
 ↓
Task
 ↓
Pull Request
 ↓
Commit
```

---

# 3. 管理体系

## 3.1 Feature

管理場所

```text
docs/product
```

例

```text
VA-FEA-001
来店ポイント付与
```

---

## 3.2 Story

管理場所

```text
GitHub Issue
```

種別

```text
type:story
```

例

```text
VA-ST-001
来店客へポイントを付与できる
```

---

## 3.3 Task

管理場所

```text
GitHub Issue
```

種別

```text
type:task
```

TaskはStory配下で管理する。

---

## 3.4 Implementation

管理場所

```text
Pull Request
Commit
```

Taskに紐付ける。

---

# 4. Story管理ルール

## 必須項目

```text
Story ID
Story Name
Parent Feature
Acceptance Criteria
Priority
```

---

例

```text
Story ID:
VA-ST-001

Parent Feature:
VA-FEA-001

Title:
来店客へポイントを付与できる

Acceptance Criteria:
・ポイント付与できる
・履歴が記録される
・異常時はエラー表示される
```

---

# 5. Task管理ルール

## 必須項目

```text
Parent Story
Task Type
Summary
Done Condition
```

---

例

```text
Parent Story:
VA-ST-001

Task Type:
Implement

Summary:
PointService実装

Done Condition:
単体テスト成功
```

---

Taskは採番しない。

GitHub Issue番号を利用する。

---

# 6. Task種別

## Investigation

調査

---

## Design

設計

---

## Implement

実装

---

## Refactor

構造改善

---

## Test

テスト

---

## Document

ドキュメント更新

---

## Review

レビュー

---

# 7. GitHub Label方針

## Issue種別

```text
type:story
type:task
type:bug
type:techdebt
type:ops
type:security
```

---

## Task種別

```text
task:investigation
task:design
task:implement
task:refactor
task:test
task:document
task:review
```

---

## 状態

```text
status:todo
status:doing
status:review
status:done
```

---

## 優先度

```text
priority:high
priority:medium
priority:low
```

---

# 8. Issue親子管理

StoryとTaskは親子関係を持つ。

```text
Story
 ├ Task
 ├ Task
 └ Task
```

---

例

```text
VA-ST-001
ポイント付与
```

↓

```text
Task
API実装

Task
Service実装

Task
テスト作成
```

---

# 9. Pull Request管理

Pull Requestは必ずTaskへ紐付ける。

---

PRテンプレート

```text
Task:
#123

Story:
VA-ST-001

Feature:
VA-FEA-001
```

---

# 10. Commit管理

Commitには対象Issueを記載する。

例

```text
refs #123

PointService追加
```

---

# 11. AI間連携ルール

## ChatGPT

作成するもの

```text
Story
Task一覧
実装順序
```

---

## Cline

管理するもの

```text
Story登録
Task登録
Issue更新
Kanban更新
```

---

## Codex

管理するもの

```text
Task実装
Pull Request作成
```

---

# 12. Cline向け出力ルール

ChatGPTはClineへ指示する際、以下の情報を出力する。

```text
Story

Story ID
Title
Parent Feature
Acceptance Criteria

Task一覧

Task Type
Summary
Done Condition
Dependency
```

---

# 13. 本プロジェクトにおける基本原則

GitHubは実行管理基盤である。

生成AIは常に以下を追跡可能な状態を維持すること。

```text
Feature
 ↓
Story
 ↓
Task
 ↓
Pull Request
 ↓
Commit
```

任意のTaskからFeatureへ辿れること。

任意のFeatureからTaskおよび実装状況を辿れること。

これを本プロジェクトのトレーサビリティ原則とする。

# 14. Github Issue タグ設計

Github Issueに付与するタグは以下とする。

### Type
type:story
type:task

### Maintenance Issue
MI:bug
MI:techdebt
MI:refactor
MI:ops
MI:security

### Task
task:investigation
task:design
task:implement
task:refactor
task:test
task:document
task:review

