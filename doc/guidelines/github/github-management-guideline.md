# GitHub Management Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける GitHub の管理方式を定義する。

GitHub は単なるソースコード管理ツールではなく、Story・Task・Implementation を管理し、Feature または MaintenanceIssue とのトレーサビリティを維持するための実行管理基盤として利用する。

本ガイドラインにより以下を実現する。

* Story管理の統一
* Task管理の統一
* TaskのInput / Output管理
* Task間の依存関係管理
* 実装状況の可視化
* Featureとのトレーサビリティ維持
* MaintenanceIssueとのトレーサビリティ維持
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
Commit
```

---

GitHubでは以下の上位概念そのものは管理しない。

```text
Vision
Goal
Capability
Epic
Feature
MaintenanceIssue
```

これらはリポジトリ内ドキュメントで管理する。

ただし、GitHub Issueで管理する Story および Task は、必ず上位概念への参照を持つ。

---

## 2.2 GitHub Issueを正本とする

StoryおよびTaskの正本はGitHub Issueとする。

生成AIはStoryやTaskを、GitHub Issueとは別の独立した正本ドキュメントとして管理してはならない。

ただし、StoryやTaskをGitHub Issueへ登録する前段階の検討資料、またはCline・ghコマンド向け登録プロンプトは作成してよい。

---

## 2.3 トレーサビリティを維持する

価値開発では、以下を双方向で追跡可能な状態にする。

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

改善開発では、以下を双方向で追跡可能な状態にする。

```text
MaintenanceIssue
 ↓
Task
 ↓
Pull Request
 ↓
Commit
```

---

任意のTaskから、親となるStoryまたはMaintenanceIssueへ辿れること。

任意のFeatureまたはMaintenanceIssueから、関連するTaskおよび実装状況を辿れること。

---

## 2.4 TaskはInput / Outputを必ず持つ

Taskは、単なる作業メモではなく、実装AIまたは人間が実行する作業単位である。

そのため、Taskには必ず以下を明記する。

```text
Input
Output
Done Condition
Dependency
```

Inputが不明確なTaskは、開始可能なTaskとして扱わない。

Outputが不明確なTaskは、完了判断可能なTaskとして扱わない。

---

## 2.5 Task間の依存関係はInput / Outputで定義する

Task間の依存関係は、単なる作業順序ではなく、以下の関係として定義する。

```text
前TaskのOutputを、後続TaskのInputとして利用する関係
```

前Taskの成果物がないと後続Taskを開始できない場合、後続Taskは前Taskに依存する。

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

FeatureそのものはGitHub Issueでは管理しない。

Featureに紐づくStoryをGitHub Issueで管理する。

---

## 3.2 MaintenanceIssue

管理場所

```text
docs/maintenance/issues
```

例

```text
MI-TD-001
Stampoアプリ構造リファクタリング
```

MaintenanceIssueそのものはGitHub Issueでは管理しない。

MaintenanceIssueに紐づくTaskをGitHub Issueで管理する。

---

## 3.3 Story

管理場所

```text
GitHub Issue
```

Issue種別

```text
type:story
```

例

```text
VA-ST-001
来店客へポイントを付与できる
```

Storyは価値開発における実行管理単位である。

Storyは必ずParent Featureを持つ。

---

## 3.4 Task

管理場所

```text
GitHub Issue
```

Issue種別

```text
type:task
```

Taskは以下のいずれかの配下で管理する。

```text
Story
MaintenanceIssue
```

価値開発の場合、TaskはStory配下で管理する。

```text
Feature
 ↓
Story
 ↓
Task
```

改善開発の場合、TaskはMaintenanceIssue配下で管理する。

```text
MaintenanceIssue
 ↓
Task
```

Taskは独自採番しない。

GitHub Issue番号を利用する。

---

## 3.5 Implementation

管理場所

```text
Pull Request
Commit
```

Implementationは必ずTaskに紐付ける。

---

# 4. Story管理ルール

## 4.1 Story必須項目

Story作成時は以下を記載する。

```text
Story ID
Story Name
Parent Feature
Description
Acceptance Criteria
Priority
Dependency
```

---

## 4.2 Story記載例

```text
Story ID:
VA-ST-001

Parent Feature:
VA-FEA-001

Title:
来店客へポイントを付与できる

Description:
店舗担当者が来店客に対してポイントを付与し、来店履歴として記録できるようにする。

Acceptance Criteria:
- 店舗担当者がポイントを付与できる
- 付与履歴が記録される
- 異常時はエラーが表示される

Priority:
High

Dependency:
- Independent
```

---

## 4.3 Storyの粒度

Storyは利用者が認識できる最小価値単位とする。

技術作業をStoryとして登録してはならない。

悪い例

```text
JWT認証を導入する
```

良い例

```text
店舗担当者がログインできる
```

---

# 5. Task管理ルール

## 5.1 Task必須項目

Task作成時は以下を記載する。

```text
Parent
Task Type
Summary
Input
Output
Done Condition
Dependency
```

---

## 5.2 Parent

Taskの親を記載する。

価値開発の場合は、Parent Storyを記載する。

```text
Parent Story:
VA-ST-001
```

改善開発の場合は、Parent MaintenanceIssueを記載する。

```text
Parent MaintenanceIssue:
MI-TD-001
```

---

## 5.3 Task Type

Task種別を記載する。

利用可能なTask Typeは以下とする。

```text
Investigation
Design
Implement
Refactor
Test
Document
Review
```

---

## 5.4 Summary

Taskの作業概要を1文で記載する。

悪い例

```text
リファクタリングする
```

良い例

```text
現行Controllerに含まれる業務ロジックをService層へ移動する対象を調査する。
```

---

## 5.5 Input

Task開始時に必要な情報、成果物、制約、対象ファイルを記載する。

Inputは以下の分類で整理する。

| Input種別          | 内容               | 例                                                    |
| ---------------- | ---------------- | ---------------------------------------------------- |
| Primary Input    | このTaskの直接の前提成果物  | 現状分析レポート、設計方針、対象Issue                                |
| Reference Input  | 参照すべきガイドライン・既存仕様 | Work Breakdown Guideline、GitHub Management Guideline |
| Constraint Input | 守るべき制約           | 機能変更しない、既存テストを壊さない                                   |
| Source Input     | 対象コード・対象ファイル     | `src/controllers/`, `package.json`                   |

---

Input記載例

```text
Input:
- Primary Input:
  - #101 現行アーキテクチャ調査の成果物
- Reference Input:
  - helloframeworkのディレクトリ構成
  - Work Breakdown Guideline
- Constraint Input:
  - このTaskではソースコードを変更しない
- Source Input:
  - src/
  - package.json
```

---

## 5.6 Output

Task完了時に生成・更新される成果物を記載する。

Outputは以下の分類で整理する。

| Output種別        | 内容         | 例                               |
| --------------- | ---------- | ------------------------------- |
| Primary Output  | 主成果物       | 差分分析レポート、設計方針、修正済みソース           |
| Evidence Output | 確認証跡       | テスト結果、コマンド結果、スクリーンショット          |
| Next Input      | 次Taskへ渡す情報 | 適用方針、残課題、リスク一覧                  |
| Update Output   | 更新対象       | GitHub Issueコメント、README更新、設計書更新 |

---

Output記載例

```text
Output:
- Primary Output:
  - helloframeworkとの差分分析レポート
- Evidence Output:
  - 比較対象ファイル一覧
- Next Input:
  - 適用可能要素一覧
  - 適用不要要素一覧
  - 不足要素一覧
  - リスク一覧
- Update Output:
  - 本Issueへの調査結果コメント
```

---

## 5.7 Done Condition

Taskが完了したと判断する条件を記載する。

Done ConditionはOutputと対応していなければならない。

悪い例

```text
Done Condition:
- 作業完了
```

良い例

```text
Done Condition:
- 差分分析レポートが作成されている
- 適用可能要素が整理されている
- 適用不要要素が整理されている
- 不足要素が整理されている
- リスクが整理されている
```

---

## 5.8 Dependency

前提となるTask、または後続Taskとの関係を記載する。

Dependencyは、単なる作業順序ではなく、前TaskのOutputを後続TaskのInputとして利用する関係を表す。

利用可能なDependency種別は以下とする。

| 種別           | 意味                         |
| ------------ | -------------------------- |
| Depends on   | 前TaskのOutputがないと開始できない     |
| Blocks       | このTaskが完了しないと後続Taskが開始できない |
| Related      | 関連はあるが、直接の依存ではない           |
| Independent  | 独立して実行可能                   |
| Review after | 対象成果物のレビューとして後続実施する        |

---

Dependency記載例

```text
Dependency:
- Depends on:
  - #101 現行アーキテクチャ調査
- Blocks:
  - #103 Repository層導入方針の設計
```

---

依存がない場合も、明示的に以下のように記載する。

```text
Dependency:
- Independent
```

---

# 6. Task種別

## 6.1 Investigation

調査を行う。

主な用途

* 原因調査
* 技術調査
* 影響範囲調査
* 現状分析
* 差分分析

主なOutput

* 調査レポート
* 現状整理
* 課題一覧
* リスク一覧
* 後続TaskへのInput

Label

```text
task:investigation
```

---

## 6.2 Design

設計を行う。

主な用途

* 画面設計
* API設計
* DB設計
* アーキテクチャ設計
* 実装方針整理

主なOutput

* 設計方針
* 設計書
* 変更対象一覧
* 実装方針
* 制約事項

Label

```text
task:design
```

---

## 6.3 Implement

実装を行う。

主な用途

* 新規コード追加
* 既存コード修正
* テストコード追加
* 設定追加

主なOutput

* 修正済みソースコード
* 実装内容の要約
* 実行結果
* 追加・更新したテスト

Label

```text
task:implement
```

---

## 6.4 Refactor

機能変更を伴わない構造改善を行う。

主な用途

* 責務分離
* 重複排除
* ディレクトリ構成整理
* 命名整理
* 共通化

主なOutput

* 構造改善済みソースコード
* 変更前後の差分説明
* 既存テスト結果
* 影響範囲

Label

```text
task:refactor
```

---

## 6.5 Test

テストケース作成またはテスト実施を行う。

主な用途

* 単体テスト作成
* 結合テスト作成
* スモークテスト
* 回帰テスト
* 画面確認

主なOutput

* テストケース
* テスト結果
* 不具合一覧
* 未確認事項

Label

```text
task:test
```

---

## 6.6 Document

ドキュメント更新を行う。

主な用途

* README更新
* 設計書更新
* ガイドライン更新
* 変更履歴追加

主なOutput

* 更新済みドキュメント
* 変更履歴
* 未反映事項

Label

```text
task:document
```

---

## 6.7 Review

成果物レビューを行う。

主な用途

* 設計レビュー
* コードレビュー
* テスト結果レビュー
* ドキュメントレビュー
* 改善効果レビュー

主なOutput

* レビュー結果
* 指摘事項
* 修正要否
* 承認可否
* 後続Task候補

Label

```text
task:review
```

---

# 7. GitHub Label方針

## 7.1 Issue種別

```text
type:story
type:task
```

---

## 7.2 MaintenanceIssue種別

MaintenanceIssueに紐づくTaskには、対象MaintenanceIssueの種別を示すラベルを付与する。

```text
MI:bug
MI:techdebt
MI:refactor
MI:ops
MI:security
```

---

## 7.3 Task種別

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

## 7.4 状態

```text
status:todo
status:doing
status:review
status:done
```

---

## 7.5 優先度

```text
priority:high
priority:medium
priority:low
```

---

## 7.6 補助ラベル

必要に応じて、対象領域やコンポーネントを表すラベルを追加してよい。

例

```text
area:backend
area:frontend
area:docs
area:test
component:controller
component:service
component:repository
component:db
component:screen
```

補助ラベルは必須ではない。

ただし、複数領域にまたがるTaskでは、レビュー容易性のため付与を推奨する。

---

# 8. Issue親子管理

## 8.1 価値開発の親子関係

価値開発では、StoryとTaskは親子関係を持つ。

```text
Feature
 └ Story
    ├ Task
    ├ Task
    └ Task
```

---

例

```text
VA-FEA-001
来店ポイント付与
```

↓

```text
VA-ST-001
店舗担当者が来店客へポイントを付与できる
```

↓

```text
Task
- API実装
- Service実装
- テスト作成
```

---

## 8.2 改善開発の親子関係

改善開発では、MaintenanceIssueとTaskは親子関係を持つ。

```text
MaintenanceIssue
 ├ Task
 ├ Task
 └ Task
```

---

例

```text
MI-TD-001
Stampoアプリ構造リファクタリング
```

↓

```text
Task
- 現状構造調査
- helloframeworkとの差分分析
- Repository層導入方針の設計
- Repository層導入
- テスト修正
- README更新
```

---

## 8.3 GitHub Issue本文での親子表現

GitHub Issue上では、本文に親IDを明記する。

価値開発Taskの場合

```text
Parent Story:
VA-ST-001
```

改善開発Taskの場合

```text
Parent MaintenanceIssue:
MI-TD-001
```

---

必要に応じて、GitHub Issue番号も併記する。

```text
Parent Story:
VA-ST-001 / #120
```

---

# 9. Pull Request管理

Pull Requestは必ずTaskへ紐付ける。

## 9.1 PR必須項目

```text
Task
Parent
Summary
Changes
Test Result
Related Issue
```

---

## 9.2 価値開発PRテンプレート

```text
Task:
#123

Story:
VA-ST-001

Feature:
VA-FEA-001

Summary:
来店ポイント付与APIを実装した。

Changes:
- PointControllerを追加
- PointServiceを追加
- point_transへの登録処理を追加

Test Result:
- npm test 成功

Related Issue:
refs #123
```

---

## 9.3 改善開発PRテンプレート

```text
Task:
#123

MaintenanceIssue:
MI-TD-001

Summary:
PointRepositoryを追加し、PointServiceからDB直接参照を分離した。

Changes:
- PointRepositoryを追加
- PointServiceのDB参照処理をRepository経由に変更
- 関連テストを更新

Test Result:
- npm test 成功

Related Issue:
refs #123
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

複数Taskを1Commitにまとめることは原則避ける。

ただし、軽微な修正やレビュー指摘対応など、1つの変更として扱う方が自然な場合は許容する。

---

# 11. Issueテンプレート

## 11.1 Story Issueテンプレート

```markdown
## Story ID

VA-ST-XXX

## Parent Feature

VA-FEA-XXX

## Title

<!-- Story名を記載 -->

## Description

<!-- 利用者視点で何を実現するかを記載 -->

## User Story

As a <!-- 利用者 -->

I want <!-- 実現したいこと -->

So that <!-- 得られる価値 -->

## Acceptance Criteria

- [ ] 
- [ ] 
- [ ] 

## Priority

High / Medium / Low

## Dependency

- Independent
```

---

## 11.2 Task Issueテンプレート

```markdown
## Parent

<!-- 価値開発の場合 -->
Parent Story:
VA-ST-XXX

<!-- 改善開発の場合 -->
Parent MaintenanceIssue:
MI-XXX-XXX

## Task Type

Investigation / Design / Implement / Refactor / Test / Document / Review

## Summary

<!-- このTaskで実施する作業を1文で記載 -->

## Input

### Primary Input

- 

### Reference Input

- 

### Constraint Input

- 

### Source Input

- 

## Output

### Primary Output

- 

### Evidence Output

- 

### Next Input

- 

### Update Output

- 

## Done Condition

- [ ] 
- [ ] 
- [ ] 

## Dependency

- Independent

<!-- または
- Depends on:
  - #XXX
- Blocks:
  - #XXX
- Related:
  - #XXX
- Review after:
  - #XXX
-->
```

---

# 12. AI間連携ルール

## 12.1 ChatGPT

ChatGPTは以下を作成する。

```text
Story
Task一覧
実装順序
Input / Output定義
Dependency定義
Cline向け登録プロンプト
Codex向け実装プロンプト
レビュー結果
```

ChatGPTはTaskを作成する際、Work Breakdown Guidelineに従い、TaskのInput / Output / Done Condition / Dependencyを明記する。

---

## 12.2 Cline

Clineは以下を管理する。

```text
Story登録
Task登録
Issue更新
Kanban更新
Label付与
DependencyのIssue本文反映
```

Clineは企画・設計判断を行わない。

ChatGPTが作成した内容をGitHubへ反映する。

---

## 12.3 Codex

Codexは以下を実施する。

```text
Task実装
テスト実行
Pull Request作成
実装結果報告
```

CodexはTaskのInput、Output、Done Condition、制約を前提として作業する。

CodexがTask範囲外の設計判断や追加作業が必要と判断した場合は、勝手に拡張せず、追加Task候補として報告する。

---

# 13. Cline向け出力ルール

ChatGPTはClineへ指示する際、以下の情報を出力する。

## 13.1 Story登録情報

```text
Story ID
Title
Parent Feature
Description
User Story
Acceptance Criteria
Priority
Dependency
Labels
```

---

## 13.2 Task登録情報

```text
Parent
Task Type
Summary
Input
Output
Done Condition
Dependency
Labels
```

---

## 13.3 Task登録例

```text
Parent MaintenanceIssue:
MI-TD-001

Task Type:
Investigation

Summary:
helloframeworkとの差分分析を実施する。

Input:
- Primary Input:
  - #101 現行アーキテクチャ調査の成果物
- Reference Input:
  - helloframeworkのディレクトリ構成
  - Work Breakdown Guideline
- Constraint Input:
  - このTaskではソースコードを変更しない
- Source Input:
  - store_point-main
  - helloframework

Output:
- Primary Output:
  - 差分分析レポート
- Evidence Output:
  - 比較対象一覧
- Next Input:
  - 適用可能要素整理
  - 適用不要要素整理
  - 不足要素整理
  - リスク整理
- Update Output:
  - GitHub Issueへの調査結果コメント

Done Condition:
- 適用可能要素が整理されている
- 適用不要要素が整理されている
- 不足要素が整理されている
- リスクが整理されている
- 差分分析レポートが作成されている

Dependency:
- Depends on:
  - #101 現行アーキテクチャ調査

Labels:
- type:task
- MI:techdebt
- task:investigation
- priority:high
- status:todo
```

---

# 14. ghコマンド利用ルール

Clineを利用しない場合、GitHub Issueはghコマンドで作成してよい。

ghコマンドを生成する場合も、本ガイドラインのIssueテンプレートに従う。

---

## 14.1 Story作成例

```bash
gh issue create \
  --title "VA-ST-001 店舗担当者が来店客へポイントを付与できる" \
  --label "type:story,priority:high,status:todo" \
  --body-file ./tmp/VA-ST-001.md
```

---

## 14.2 Task作成例

```bash
gh issue create \
  --title "helloframeworkとの差分分析を実施する" \
  --label "type:task,MI:techdebt,task:investigation,priority:high,status:todo" \
  --body-file ./tmp/MI-TD-001-task-diff-analysis.md
```

---

# 15. 禁止事項

## 15.1 [禁]TaskにInput / Outputを記載しない

悪い例

```text
Summary:
現状を調査する。

Done Condition:
調査完了
```

理由

* 何を前提にするか不明
* 何を成果物とするか不明
* 後続Taskへ接続できない

---

## 15.2 [禁]Taskの親を記載しない

悪い例

```text
Task Type:
Implement

Summary:
PointServiceを修正する。
```

理由

* StoryまたはMaintenanceIssueへ辿れない
* 実装目的が不明になる
* PR・Commitとのトレーサビリティが失われる

---

## 15.3 [禁]MaintenanceIssueをGitHub Issueとして重複管理する

MaintenanceIssueそのものは、リポジトリ内ドキュメントで管理する。

GitHub Issueでは、MaintenanceIssueに紐づくTaskを管理する。

---

## 15.4 [禁]FeatureをGitHub Issueとして重複管理する

Featureそのものは、リポジトリ内ドキュメントで管理する。

GitHub Issueでは、Featureに紐づくStoryを管理する。

---

## 15.5 [禁]複数の親を持つTaskを作成する

Taskの親は原則1つとする。

複数のStoryまたはMaintenanceIssueにまたがる場合は、Task粒度が大きすぎる可能性が高いため、分割を検討する。

---

# 16. 本プロジェクトにおける基本原則

GitHubは実行管理基盤である。

StoryおよびTaskはGitHub Issueを正本とする。

Taskは必ず、Parent、Task Type、Summary、Input、Output、Done Condition、Dependencyを持つ。

Task間の依存関係は、前TaskのOutputを後続TaskのInputとして利用する関係で定義する。

価値開発では、以下を追跡可能な状態にする。

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

改善開発では、以下を追跡可能な状態にする。

```text
MaintenanceIssue
 ↓
Task
 ↓
Pull Request
 ↓
Commit
```

任意のTaskからFeatureまたはMaintenanceIssueへ辿れること。

任意のFeatureまたはMaintenanceIssueからTaskおよび実装状況を辿れること。

これを本プロジェクトのトレーサビリティ原則とする。

# 17. Github Issue タグ設計

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

