# Maintenance Management Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける改善開発（Improvement Development）の管理方式を定義する。

改善開発はユーザー価値の追加ではなく、既存システムの品質維持・向上を目的とする。

本ガイドラインにより以下を実現する。

* 技術的負債の可視化
* 不具合管理の体系化
* 改善要求の優先順位管理
* 品質改善の継続的推進
* AIによる改善提案精度向上
* 改善開発と価値開発の分離

本ドキュメントは、人間および生成AIが共通認識を持つための正本とする。

---

# 2. 関連ドキュメント

| ドキュメント                                     | 役割        |
| ------------------------------------------ | --------- |
| Value and Improvement Management Guideline | 改善開発体系定義  |
| Work Breakdown Guideline                   | Task分割ルール |
| GitHub Management Guideline                | Task管理ルール |
| AI Development Operation Model             | AI間連携方式   |

---

# 3. 基本思想

改善開発はユーザー価値ではなく品質改善を目的とする。

改善開発は以下の体系で管理する。

```text
MaintenanceIssue
 ↓
Task
 ↓
Implementation
```

改善開発は Product Backlog とは独立して管理する。

---

# 4. 管理体系

## 4.1 Maintenance Index

改善開発の一覧管理を行う。

管理場所

```text
docs/product/maintenance_issue/maintenance-index.md
```

管理対象

* Bug
* TechDebt
* Ops
* Security

---

## 4.2 MaintenanceIssue

個別の改善要求を管理する。

管理場所

```text
docs/product/maintenance_issue/<Type>/
```

_※タイプについては[Type](#type)を参照_


例

```text
MI-TD-001.md
MI-BUG-001.md
MI-OPS-001.md
```

---

## 4.3 Task

実装作業を管理する。

管理場所

```text
GitHub Issue
```

---

## 4.4 Implementation

実際の修正を管理する。

管理場所

```text
Source
Pull Request
Commit
```

---

# 5. MaintenanceIssue種別

## Bug

期待動作との差異を修正する。

例

```text
ポイント付与時に二重登録される
```

---

## TechDebt

将来の保守性や開発効率を阻害する課題。

例

```text
Controllerに業務ロジックが集中している
```

---

## Refactor

機能変更を伴わない構造改善。

例

```text
共通ライブラリへの集約
```

---

## Ops

運用改善。

例

```text
監視ログ強化
```

---

## Security

セキュリティ改善。

例

```text
認証方式強化
```

---

# 6. ライフサイクル

MaintenanceIssue は以下の状態を持つ。

```text
Proposed
 ↓
Analyzing
 ↓
Approved
 ↓
In Progress
 ↓
Review
 ↓
Done
```

---

## Proposed

改善候補

---

## Analyzing

調査中

---

## Approved

実施決定

---

## In Progress

実装中

---

## Review

レビュー中

---

## Done

完了

---

# 7. 優先順位ルール

## Critical

早急対応

例

* 本番障害
* セキュリティ問題

---

## High

次スプリント対応

例

* 開発停滞要因
* 重大不具合

---

## Medium

計画的改善

例

* 一般的なTechDebt

---

## Low

余裕時対応

例

* 軽微リファクタリング

---

# 7.5 管理項目の凡例

MaintenanceIssue および Maintenance Index では、以下の管理項目を利用する。

| 項目                | 説明                  |
| ----------------- | ------------------- |
| ID                | MaintenanceIssue識別子 |
| Type              | 改善種別                |
| Title             | 改善内容の概要             |
| Priority          | 優先度                 |
| Status            | 状態                  |
| Related Feature   | 関連するFeature（存在する場合） |
| Owner             | 主担当者または担当AI         |
| Updated           | 最終更新日               |

---

## Type

改善種別を表す。

| Type     | 説明       |
| -------- | -------- |
| Bug      | 不具合修正    |
| TechDebt | 技術的負債解消  |
| Ops      | 運用改善     |
| Security | セキュリティ改善 |

---

## Priority

改善優先度を表す。

| Priority | 説明             |
| -------- | -------------- |
| Critical | 緊急対応が必要        |
| High     | 次スプリントで対応を検討する |
| Medium   | 計画的に対応する       |
| Low      | 将来的に対応する       |

---

## Status

改善対応状況を表す。

| Status      | 説明    |
| ----------- | ----- |
| Proposed    | 改善候補  |
| Analyzing   | 調査中   |
| Approved    | 実施決定  |
| In Progress | 実装中   |
| Review      | レビュー中 |
| Done        | 完了    |
| Rejected    | 却下    |

---

## Related Feature

改善対象が特定の Feature に関連する場合に記載する。

例

```text
VA-FEA-001
来店ポイント付与
```

改善開発単独の場合は空欄を許可する。

---

## Owner

改善対応の主担当を表す。

例

```text
PO
ChatGPT
Codex
Claude
```

または

```text
未割当
```

を設定してもよい。

---

## Updated

MaintenanceIssue または Maintenance Index が最後に更新された日付を記載する。

記載形式

```text
YYYY-MM-DD
```

例

```text
2026-06-14
```

---

# 8. MaintenanceIssue記載ルール

必須項目

```text
Issue ID
Issue Type
Title
Background
Problem
Impact
Proposed Solution
Priority
Status
Related Feature
```

---

# 9. トレーサビリティ

以下を追跡可能とする。

```text
MaintenanceIssue
 ↓
Task
 ↓
Pull Request
 ↓
Commit
```

必要に応じて以下も管理する。

```text
MaintenanceIssue
 ↓
Related Feature
```

---

# 10. AIへの指示ルール

## PM

MaintenanceIssueをFeature化してはならない。

---

## PJM

MaintenanceIssueをTaskへ分割する。

---

## 実装戦略担当

Taskを実装AI向けへ変換する。

---

## QA担当

改善効果を評価する。

---

## プロダクト分析担当

Maintenance Backlogを定期分析し、優先順位見直しを提案する。

---

# 11. 本プロジェクトにおける原則

改善開発は価値開発とは独立して管理する。

## Value Development

```text
Vision
 ↓
Goal
 ↓
Capability
 ↓
Epic
 ↓
Feature
 ↓
Story
 ↓
Task
```

---

## Improvement Development

```text
MaintenanceIssue
 ↓
Task
 ↓
Implementation
```

生成AIは両者を混同してはならない。
