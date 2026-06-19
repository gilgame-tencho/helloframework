# Work Breakdown Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける Story および Task の分割方針を定義する。

本プロジェクトでは生成AIを活用したアジャイル開発を前提としているため、実装可能な粒度で Story および Task を定義し、実装AIが迷わず作業できる状態を作ることを目的とする。

本ガイドラインにより以下を実現する。

* Story粒度の統一
* Task粒度の統一
* AI実装効率向上
* レビュー容易性向上
* テスト容易性向上
* 依存関係の明確化
* Task間のInput / Output連鎖の明確化
* MVP志向の維持

本ドキュメントは、人間および生成AIが共通認識を持つための正本とする。

---

# 2. 関連ドキュメント

本ドキュメントは以下と連携する。

| ドキュメント                                     | 役割                   |
| ------------------------------------------ | -------------------- |
| Value and Improvement Management Guideline | 開発管理体系および用語定義        |
| GitHub Management Guideline                | Story・Taskの登録および追跡管理 |
| AI Development Operation Model             | AI間連携および責務定義         |
| Maintenance Management Guideline           | MaintenanceIssue管理方式 |

---

# 3. 基本思想

本プロジェクトでは以下を明確に区別する。

| 要素             | 目的                 |
| -------------- | ------------------ |
| Feature        | 提供する機能価値           |
| Story          | 実現する最小価値           |
| Task           | 実装・調査・設計・検証などの作業単位 |
| Implementation | コード変更              |

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

生成AIは価値と作業を混同してはならない。

Storyは利用者にとっての価値で分割する。

Taskは実行可能な作業で分割する。

---

# 4. Story分割ルール

## 4.1 Storyの目的

Storyは利用者が認識できる最小価値単位とする。

Featureを直接実装してはならない。

Featureは必ず1つ以上のStoryへ分割する。

---

## 4.2 良いStoryの条件

Storyは以下を満たすこと。

* 利用者視点で説明できる
* 単独で価値確認できる
* 受入条件を定義できる
* 単独デモ可能
* MVPとして成立する

---

## 4.3 Story分割判断基準

以下に該当する場合は分割する。

* 複数利用者が登場する
* 複数画面にまたがる
* 複数受入条件が存在する
* 独立リリースが難しい
* MVP価値が確認できない

---

## 4.4 悪いStory例

### 大きすぎる例

```text
認証機能を作る
```

理由

* 複数価値を含む
* 完了条件が曖昧

---

### 技術視点の例

```text
JWT認証を導入する
```

理由

* 利用者価値が表現されていない

---

## 4.5 良いStory例

```text
ログインできる

ログアウトできる

パスワードを再設定できる
```

---

# 5. Story作成ルール

## 5.1 記載形式

Storyは利用者視点で記述する。

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

## 5.2 必須項目

Story作成時は以下を定義する。

* Story名
* 利用者
* 価値
* 受入条件
* 優先度
* 依存Story

---

# 6. Task分割ルール

## 6.1 Taskの目的

TaskはStoryまたはMaintenanceIssueを実現するための作業単位とする。

Task自体はユーザー価値を持たない。

Taskは、実装・調査・設計・検証・レビューなど、実行可能な作業として定義する。

---

## 6.2 良いTaskの条件

Taskは以下を満たすこと。

* 作業内容が明確
* 実装者または実装AIが迷わない
* Inputが明確
* Outputが明確
* Done Conditionが明確
* レビュー可能
* テストまたは確認可能
* 依存関係が明確
* 前後のTaskとの関係が追跡可能

---

## 6.3 推奨粒度

本プロジェクトではAI開発を主体とするため、Task粒度は作業時間のみでは判断しない。

Taskは、以下を主な判断基準とする。

```text
AIが1回の依頼で安全に完了できる範囲
```

具体的には、以下を満たす粒度とする。

* 1つの明確な目的を持つ
* Inputを読めば作業を開始できる
* Outputを見れば完了判断できる
* 対象範囲が広がりすぎない
* 実装AIが独自に大きな設計判断をしなくてよい
* レビューAIまたは人間が独立して確認できる
* 失敗時に差し戻しやすい

---

人間作業の目安としては、1Taskは概ね以下を参考値とする。

```text
2〜8時間程度
```

ただし、この時間は補助基準である。

本プロジェクトでは、作業時間よりも以下を優先する。

* コンテキスト範囲
* 変更対象範囲
* 判断の独立性
* 検証可能性
* 成果物の明確さ
* 手戻りリスク

---

## 6.4 Task必須項目

Task作成時は以下を定義する。

```text
Parent:
Task Type:
Summary:
Input:
Output:
Done Condition:
Dependency:
```

---

### Parent

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

### Task Type

Task種別を記載する。

例

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

### Summary

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

### Input

Task開始時に必要な情報、成果物、制約、対象ファイルを記載する。

Inputが明確でないTaskは、開始可能なTaskとして扱わない。

---

### Output

Task完了時に生成・更新される成果物を記載する。

Outputが明確でないTaskは、完了判断できないTaskとして扱う。

---

### Done Condition

Taskが完了したと判断する条件を記載する。

Done ConditionはOutputと対応していなければならない。

---

### Dependency

前提となるTask、または後続Taskとの関係を記載する。

Dependencyは単なる作業順序ではなく、前TaskのOutputを後続TaskのInputとして利用する関係を表す。

---

## 6.5 Task Inputルール

Inputには、Taskを実行するために必要な情報を明記する。

Inputは以下の分類で整理する。

| Input種別          | 内容               | 例                                                    |
| ---------------- | ---------------- | ---------------------------------------------------- |
| Primary Input    | このTaskの直接の前提成果物  | 現状分析レポート、設計方針、対象Issue                                |
| Reference Input  | 参照すべきガイドライン・既存仕様 | Work Breakdown Guideline、GitHub Management Guideline |
| Constraint Input | 守るべき制約           | 機能変更しない、既存テストを壊さない                                   |
| Source Input     | 対象コード・対象ファイル     | `src/controllers/`, `package.json`                   |

---

### Input記載例

```text
Input:
- Primary Input:
  - 現行アーキテクチャ調査レポート
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

### Inputに関する禁止事項

以下は禁止する。

* Inputを空欄にする
* 「関連資料一式」など曖昧に記載する
* 前Taskの成果物を利用するにもかかわらずDependencyを記載しない
* 参照すべき制約を省略する

---

## 6.6 Task Outputルール

Outputには、Task完了時に生成・更新される成果物を明記する。

Outputは以下の分類で整理する。

| Output種別        | 内容         | 例                               |
| --------------- | ---------- | ------------------------------- |
| Primary Output  | 主成果物       | 差分分析レポート、設計方針、修正済みソース           |
| Evidence Output | 確認証跡       | テスト結果、コマンド結果、スクリーンショット          |
| Next Input      | 次Taskへ渡す情報 | 適用方針、残課題、リスク一覧                  |
| Update Output   | 更新対象       | GitHub Issueコメント、README更新、設計書更新 |

---

### Output記載例

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
  - 対象GitHub Issueへの調査結果コメント
```

---

### Outputに関する禁止事項

以下は禁止する。

* Outputを空欄にする
* 「調査完了」など成果物が残らない表現のみとする
* 後続Taskが利用する情報をOutputに含めない
* Done ConditionとOutputが対応していない

---

## 6.7 Task依存関係ルール

Task間の依存関係は、以下で判断する。

```text
前TaskのOutputを、後続TaskのInputとして利用するか
```

利用する場合、後続Taskは前Taskに依存する。

---

## 6.8 Dependency種別

Task間の関係は以下の種別で表現する。

| 種別           | 意味                         |
| ------------ | -------------------------- |
| Depends on   | 前TaskのOutputがないと開始できない     |
| Blocks       | このTaskが完了しないと後続Taskが開始できない |
| Related      | 関連はあるが、直接の依存ではない           |
| Independent  | 独立して実行可能                   |
| Review after | 対象成果物のレビューとして後続実施する        |

---

### Dependency記載例

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

## 6.9 Task分割判断基準

以下に該当する場合はTaskを分割する。

* 複数責務を持つ
* 複数コンポーネントへ影響する
* Inputが異なる
* Outputが異なる
* Done Conditionが複数系統に分かれる
* レビュー観点が大きく異なる
* テスト観点が大きく異なる
* 前Taskの成果物がないと作業できない部分を含む
* 依存関係が複雑になる
* AIが1回の依頼で安全に完了できない
* 実装AIに設計判断を委ねすぎる

---

## 6.10 悪いTask例

```text
ポイント機能を作る
```

理由

* 作業範囲が広い
* 完了条件が曖昧
* Input / Outputが不明確
* StoryまたはFeatureに近い粒度である

---

```text
Stampo全体をhelloframework構成にリファクタリングする
```

理由

* 複数コンポーネントにまたがる
* 影響範囲が広い
* 調査、設計、実装、テストが混在している
* AIが1回の依頼で安全に完了できない

---

```text
調査する
```

理由

* 調査対象が不明
* 調査観点が不明
* Outputが不明
* 後続Taskへの接続が不明

---

## 6.11 良いTask例

```text
現行Controllerに含まれる業務ロジックを調査する
```

理由

* 調査対象が明確
* Outputとして対象一覧を作成できる
* 後続の設計Taskへ接続できる

---

```text
helloframeworkとの差分分析を実施する
```

理由

* Inputとして現状分析レポートを利用できる
* Outputとして適用可能要素、不足要素、リスクを整理できる
* 後続の設計Taskへ接続できる

---

```text
PointRepositoryを追加し、PointServiceからDB直接参照を分離する
```

理由

* 変更対象が限定されている
* Outputがソース差分として確認できる
* テストにより完了確認できる

---

# 7. Task種別

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

## 7.1 Task種別ごとのInput / Output

| Task Type     | 主なInput          | 主なOutput                  |
| ------------- | ---------------- | ------------------------- |
| Investigation | 対象コード、既存仕様、調査観点  | 調査レポート、課題一覧、リスク一覧、次Task候補 |
| Design        | 調査結果、要件、制約、既存設計  | 設計方針、設計書、変更対象一覧、実装方針      |
| Implement     | 承認済設計、対象ファイル、制約  | 修正済みソース、実装結果、実行結果         |
| Refactor      | 改善方針、既存テスト、対象コード | 構造改善済みソース、差分説明、テスト結果      |
| Test          | 実装結果、受入条件、テスト観点  | テストケース、テスト結果、不具合一覧        |
| Document      | 実装結果、設計結果、変更内容   | 更新済みドキュメント、変更履歴           |
| Review        | 成果物、レビュー観点、判断基準  | レビュー結果、指摘事項、修正要否、判定       |

---

## 7.2 Investigation

原因調査・技術調査を行う。

Investigation Taskでは、必ず調査観点と調査成果物を明記する。

### 主なOutput

* 調査レポート
* 現状整理
* 課題一覧
* リスク一覧
* 後続TaskへのInput

---

## 7.3 Design

設計成果物を作成する。

Design Taskでは、設計判断の根拠と、実装Taskへ渡す方針を明記する。

### 主なOutput

* 設計方針
* 設計書
* 変更対象一覧
* 実装方針
* 制約事項

---

## 7.4 Implement

ソースコードを実装する。

Implement Taskでは、承認済みの設計または実装方針をInputとする。

実装AIが独自に大きな設計変更を行う必要がある場合は、Implement Taskではなく、先にDesign Taskを作成する。

### 主なOutput

* 修正済みソースコード
* 実装内容の要約
* 実行結果
* 追加・更新したテスト

---

## 7.5 Refactor

機能変更を伴わない構造改善を行う。

Refactor Taskでは、既存挙動を変えないことを制約として明記する。

### 主なOutput

* 構造改善済みソースコード
* 変更前後の差分説明
* 既存テスト結果
* 影響範囲

---

## 7.6 Test

テストケース作成またはテスト実施を行う。

Test Taskでは、何を確認すれば完了かを明確にする。

### 主なOutput

* テストケース
* テスト結果
* 不具合一覧
* 未確認事項

---

## 7.7 Document

ドキュメント更新を行う。

Document Taskでは、更新対象ドキュメントと更新理由を明記する。

### 主なOutput

* 更新済みドキュメント
* 変更履歴
* 未反映事項

---

## 7.8 Review

成果物レビューを行う。

Review Taskでは、レビュー対象、レビュー観点、判定基準を明記する。

### 主なOutput

* レビュー結果
* 指摘事項
* 修正要否
* 承認可否
* 後続Task候補

---

# 8. MaintenanceIssue分割ルール

MaintenanceIssueは問題管理単位である。

直接実装してはならない。

必ずTaskへ分割すること。

---

## 8.1 MaintenanceIssueからTaskへの基本分解

MaintenanceIssueは必要に応じて以下の流れでTaskへ分解する。

```text
Investigation
 ↓
Design
 ↓
Implement / Refactor
 ↓
Test
 ↓
Document
 ↓
Review
```

すべてのTask種別を必ず作成する必要はない。

ただし、影響範囲が不明な場合は、必ずInvestigation Taskを先行する。

設計判断が必要な場合は、ImplementまたはRefactorの前にDesign Taskを作成する。

---

## 8.2 MaintenanceIssue分解例

```text
MI-TD-001

Stampoアーキテクチャ改善
```

↓

```text
Task
- 現状構造調査
- helloframeworkとの差分分析
- Repository層導入方針の設計
- Repository層導入
- Service層責務整理
- 既存テスト修正
- README更新
- 改善結果レビュー
```

---

## 8.3 Task間のInput / Output連鎖例

```text
Task 1:
現状構造調査

Output:
- 現状分析レポート
- 現行ディレクトリ構成
- 課題一覧
```

↓

```text
Task 2:
helloframeworkとの差分分析

Input:
- Task 1の現状分析レポート
- helloframework構成

Output:
- 適用可能要素一覧
- 適用不要要素一覧
- 不足要素一覧
- リスク一覧
```

↓

```text
Task 3:
Repository層導入方針の設計

Input:
- Task 2の差分分析結果

Output:
- Repository層導入方針
- 変更対象ファイル一覧
- 実装Task候補
```

---

## 8.4 良いMaintenanceIssue

```text
認証処理重複解消

ログ監視強化

二重登録不具合修正
```

---

## 8.5 悪いMaintenanceIssue

```text
システムを改善する
```

理由

* 改善対象が不明
* 影響範囲が不明
* Task分割の起点にできない

---

# 9. AIへの指示ルール

## 9.1 PM

FeatureからStoryを作成する際、本ガイドラインを利用する。

PMはStoryが利用者価値として成立しているかを確認する。

---

## 9.2 PJM

StoryまたはMaintenanceIssueからTaskを作成する際、本ガイドラインを利用する。

PJMは各Taskについて、以下を確認する。

* Inputが明確か
* Outputが明確か
* Done Conditionが明確か
* Dependencyが明確か
* AIが1回の依頼で安全に完了できる粒度か

---

## 9.3 実装戦略担当

Taskを実装AI向けへ変換する際、本ガイドラインを利用する。

実装戦略担当は、Codex向けプロンプト作成時に以下を明示する。

* Taskの目的
* Input
* Output
* 制約
* 対象ファイル
* 実装順序
* 完了条件
* 実行すべき確認コマンド

---

## 9.4 プロダクト分析担当

Story粒度やTask粒度が適切であったかを評価し、改善提案を行う。

特に以下を確認する。

* Taskが大きすぎなかったか
* Taskが小さすぎなかったか
* Input不足による手戻りが発生しなかったか
* Output不足により後続Taskが曖昧にならなかったか
* AI実装に適した粒度だったか

---

# 10. 禁止事項

以下は禁止とする。

---

## 10.1 Storyに技術作業を書く

悪い例

```text
JWT認証導入
```

---

## 10.2 Storyに実装内容を書く

悪い例

```text
PointService作成
```

---

## 10.3 Taskに価値要求を書く

悪い例

```text
顧客管理機能作成
```

---

## 10.4 実装順序を無視したTask分割

悪い例

```text
API未実装なのに画面実装を先行する
```

---

## 10.5 Input / Outputを省略する

悪い例

```text
Task:
現状を調査する

Input:
なし

Output:
調査完了
```

理由

* 何を前提にするか不明
* 何が成果物か不明
* 後続Taskへ接続できない

---

## 10.6 AIに大きな設計判断を委ねるTaskを作成する

悪い例

```text
いい感じにアーキテクチャを整理する
```

理由

* 判断基準が不明
* 影響範囲が広い
* Done Conditionを定義できない
* レビュー不能になりやすい

---

# 11. 本プロジェクトにおける基本原則

Storyは価値で分割する。

Taskは作業で分割する。

Taskは必ずInputとOutputを持つ。

Task間のDependencyは、前TaskのOutputを後続TaskのInputとして利用する関係で定義する。

AI開発におけるTask粒度は、作業時間ではなく、AIが1回の依頼で安全に完了できる範囲を主基準とする。

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

改善開発では以下を意識すること。

```text
MaintenanceIssue
 ↓
Task（作業）

 ↓

Implementation（コード）
```

価値と作業を混同しないこと。

TaskのInput / Outputを明確にし、Task間の関係を追跡可能にすること。

これを本プロジェクトの基本原則とする。
