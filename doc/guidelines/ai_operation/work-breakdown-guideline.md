# Work Breakdown Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける Story および Task の分割方針を定義する。

本プロジェクトでは生成AIを活用したアジャイル開発を前提としているため、実装AIが迷わず作業できる粒度で Story および Task を定義することを目的とする。

本ガイドラインにより以下を実現する。

* 実装AIへの指示品質向上
* スプリント計画の精度向上
* レビュー容易性向上
* テスト容易性向上
* タスク依存関係の明確化
* 継続的な価値提供

本ドキュメントは、人間および生成AIが共通認識を持つための正本とする。

---

# 2. 基本思想

本プロジェクトでは以下を明確に区別する。

| 管理単位           | 目的       |
| -------------- | -------- |
| Feature        | 提供する機能価値 |
| Story          | 実現する最小価値 |
| Task           | 実装作業     |
| Implementation | コード変更    |

---

価値開発

```text
Feature
 ↓
Story
 ↓
Task
 ↓
Implementation
```

---

改善開発

```text
MaintenanceIssue
 ↓
Task
 ↓
Implementation
```

---

Feature や MaintenanceIssue は管理単位であり、
Story や Task は実行単位である。

生成AIは管理単位と実行単位を混同してはならない。

---

# 3. Story分割ルール

## 3.1 Storyの目的

Storyは利用者が認識できる最小価値単位とする。

Featureをそのまま実装してはならない。

Featureは必ず1つ以上のStoryへ分割する。

---

## 3.2 良いStoryの条件

Storyは以下を満たすこと。

* 利用者視点で説明できる
* 単独で価値確認できる
* 受入条件を定義できる
* 1スプリント以内で完了可能
* デモ可能である

---

## 3.3 Story記載形式

```text
As a <利用者>

I want <実現したいこと>

So that <得られる価値>
```

---

例

```text
As a 店舗担当者

I want 来店客へポイントを付与したい

So that 来店履歴を記録できる
```

---

## 3.4 悪いStory例

### 大きすぎる例

```text
認証機能を作る
```

理由

* 複数価値を含む
* 完了条件が不明

---

### 技術視点の例

```text
JWT認証を導入する
```

理由

* 利用者視点ではない

---

## 3.5 良いStory例

```text
ログインできる

ログアウトできる

パスワードを再設定できる
```

---

# 4. Story分割判断基準

Storyが以下のいずれかに該当する場合は分割する。

* 1スプリントで終わらない
* 複数画面にまたがる
* 複数利用者が登場する
* 複数の受入条件が存在する
* 独立リリースが難しい

---

# 5. Task分割ルール

## 5.1 Taskの目的

Taskは実装者が実施する作業単位とする。

Task自体は価値を持たない。

---

## 5.2 良いTaskの条件

Taskは以下を満たすこと。

* 作業内容が明確
* 実装者が迷わない
* レビュー可能
* テスト可能
* 依存関係が明確

---

## 5.3 推奨粒度

1Taskは概ね以下を目安とする。

```text
2〜8時間程度
```

長くても1営業日以内を推奨する。

---

## 5.4 悪いTask例

```text
ポイント機能を作る
```

理由

* 作業範囲が広すぎる
* 完了条件が不明

---

## 5.5 良いTask例

```text
PointController作成

PointService作成

PointRepository作成

単体テスト作成
```

---

# 6. Task種別

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

---

## Investigation

原因調査や技術調査を行う。

例

```text
Sequelize障害原因調査
```

---

## Design

設計を行う。

例

```text
ポイント履歴API設計
```

---

## Implement

実装を行う。

例

```text
PointService実装
```

---

## Refactor

機能変更を伴わない構造改善を行う。

例

```text
Repository層導入
```

---

## Test

テストコードやテスト実施を行う。

例

```text
単体テスト追加
```

---

## Document

ドキュメントを更新する。

例

```text
API仕様更新
```

---

## Review

レビューを実施する。

例

```text
コードレビュー
```

---

# 7. MaintenanceIssueのTask分割ルール

MaintenanceIssue配下では、
Taskは問題解決のための作業として定義する。

例

```text
MI-TD-001
Stampoアーキテクチャ改善
```

↓

```text
Task
- 現状構造調査
- Repository層導入
- DI導入
- テスト修正
- README更新
```

---

MaintenanceIssueをTaskへ直接変換してはならない。

必ず複数Taskへ分割可能か検討すること。

---

# 8. GitHub Issue管理方針

TaskはGitHub Issueとして管理する。

Taskは採番しない。

GitHubのIssue番号を利用する。

例

```text
#123 [Implement]
ポイント付与API作成

#124 [Test]
ポイント付与テスト追加
```

---

## 必須記載項目

GitHub Issueには以下を記載する。

```text
Parent:
Type:
Summary:
Done Condition:
```

---

価値開発例

```text
Parent: VA-ST-001
Type: Implement
```

---

改善開発例

```text
Parent: MI-TD-001
Type: Refactor
```

---

# 9. AIへの指示ルール

生成AIは Story および Task を作成する際、以下を遵守すること。

## Story作成時

* 利用者価値を基準とする
* 技術観点で分割しない
* MVPを意識する
* 単独デモ可能とする

---

## Task作成時

* 実装者が迷わない粒度にする
* 依存関係を明示する
* レビュー可能なサイズにする
* 実装順序を考慮する

---

## 禁止事項

以下は禁止とする。

### Storyに技術作業を書く

例

```text
JWT認証導入
```

---

### Taskに価値要件を書く

例

```text
顧客管理機能作成
```

---

### 実装順序を考慮しない分割

例

```text
API未作成なのに画面実装を先行する
```

---

# 10. 本プロジェクトにおける基本原則

Storyは価値で分割する。

Taskは作業で分割する。

生成AIは常に以下を意識すること。

```text
Feature
 ↓
Story（価値）

 ↓

Task（作業）

 ↓

Implementation（コード）
```

価値と作業を混同しないことを本プロジェクトの基本原則とする。
