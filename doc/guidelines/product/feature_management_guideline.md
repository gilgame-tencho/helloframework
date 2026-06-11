# Feature Management Guideline

## 1. 目的

本ドキュメントは、本プロジェクトにおける Feature の管理方式を定義する。

Feature は Epic を実現するための機能単位であり、Story・画面設計・API設計・DB設計・実装・テストをつなぐ中核管理単位とする。

本ガイドラインの目的は以下とする。

* Feature単位で開発価値を管理する
* Story・Taskへの分解基準を明確にする
* 画面・API・DB・テストとのトレーサビリティを確保する
* MVP対象と後続改善対象を区別する
* 生成AIへの実装指示品質を向上させる

---

# 2. Featureの位置づけ

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
 ↓
Implementation
```

Feature はユーザーまたは業務担当者が認識できる機能価値単位とする。

---

# 3. Featureの定義

Featureとは、Epicを実現するための具体的な機能単位である。

## 良い例

* 来店ポイント発行
* ポイント履歴確認
* クーポン交換
* 店舗作成
* カードケース表示

## 悪い例

* ボタン追加
* DBカラム追加
* CSS修正
* Service修正
* 共通処理整理

上記はStoryまたはTaskとして扱う。

---

# 4. Feature管理方針

## 4.1 価値単位で定義する

Featureは利用者価値を基準に定義する。

判断基準

```text
利用者が価値として認識できるか
```

YESであればFeature候補とする。

---

## 4.2 複数システム要素にまたがってよい

Featureは実装単位ではない。

以下を横断してよい。

* 画面
* API
* DB
* バッチ
* 通知

---

## 4.3 Storyへ分解して実装する

Featureを直接実装してはならない。

必ずStoryへ分解する。

---

## 4.4 MVP区分を持つ

| 区分     | 説明       |
| ------ | -------- |
| MVP    | 初期リリース対象 |
| Next   | MVP後優先候補 |
| Later  | 将来候補     |
| Hold   | 保留       |
| Reject | 不採用      |

---

# 5. Feature状態管理

Featureの状態は以下で管理する。

```text
Candidate
 ↓
Approved
 ↓
In Progress
 ↓
Done
 ↓
Released
```

## Candidate

Feature候補

---

## Approved

PO承認済

---

## In Progress

配下のStoryの設計または実装が進行中

---

## Done

MVP完了条件を満たした状態

---

## Released

本番リリース済

---

Featureの詳細進捗管理は行わず、進捗はStoryで管理する。

---

# 6. Feature管理項目

| 項目            | 内容                  |
| ------------- | ------------------- |
| Feature ID    | 一意識別子               |
| Feature名      | 機能名称                |
| Capability    | 所属Capability        |
| Epic ID       | 所属Epic              |
| 概要            | Feature概要           |
| ユーザー価値        | 提供価値                |
| MVP区分         | MVP分類               |
| 優先度           | High / Middle / Low |
| 状態            | Feature状態           |
| 関連Story       | Story一覧             |
| 関連画面          | 画面一覧                |
| Primary API   | 主API                |
| Primary Table | 主テーブル               |
| MVP完了条件       | MVP判定条件             |
| 備考            | 補足                  |

---

# 7. Feature ID採番ルール

```text
F-{領域}-{連番}
```

例

```text
F-AUTH-001
F-CARD-001
F-POINT-001
F-NEWS-001
F-SHOP-001
```

---

# 8. Feature詳細テンプレート

```markdown
# F-POINT-001 来店ポイント発行

## 概要

店舗担当者が来店客へポイントを付与できる機能

---

## 親階層

| 項目 | 内容 |
|--------|--------|
| Capability | ポイントカード基盤 |
| Epic ID | EP-ENGAGEMENT-001 |

---

## ユーザー価値

店舗担当者は来店客へポイントを付与できる

利用者は来店実績に応じてポイントを獲得できる

---

## MVP区分

MVP

---

## 優先度

High

---

## 状態

Approved

---

## MVP完了条件

- 店舗担当者がポイント発行できる
- ユーザーがポイント取得できる
- 二重取得が防止される
- 取引履歴が保存される

以下は対象外

- ポイント失効
- ポイント交換
- ランク機能

---

## 関連Story

| Story ID | Story名 | 状態 |
|--------|--------|--------|
| ST-POINT-001 | QR発行 | Approved |
| ST-POINT-002 | QR受取 | Candidate |
| ST-POINT-003 | 履歴保存 | Candidate |

---

## Screen Impact

| Screen ID | Type |
|--------|--------|
| S201 | Add |
| U201 | Add |
| U101 | Modify |

Type

- Add
- Modify
- Delete

---

## 関連画面

| ID | 画面名 |
|--------|--------|
| S201 | ポイント発行 |
| U201 | QR読取 |
| U101 | カードケース |

---

## Primary API

POST /points/issue

---

## Primary Table

point_trans

---

## 受入条件

- MVP完了条件を満たす
- 関連Storyが完了している
- テスト完了
- PO承認済

---

## 変更履歴

| Ver | 内容 |
|--------|--------|
| 0.1 | 初版作成 |
| 0.2 | QR仕様追加 |
| 0.3 | ポイント交換対象外を明記 |

```

---

# 9. FeatureとStoryの分解ルール

以下の観点でStoryへ分解する。

* 利用者ロール
* 利用シナリオ
* 画面単位
* MVP範囲
* 正常系
* 異常系

Storyは原則1スプリント以内で完了可能とする。

---

# 10. Featureと画面設計の連携

画面設計とのトレーサビリティを保持する。

```text
Feature
 ↓
Screen
 ↓
Implementation
 ↓
Test
```

画面変更を伴う場合は以下を更新する。

* feature詳細
* screen-index.md
* 対象画面詳細
* 対象遷移図

---

# 11. Featureと改善開発の切り分け

以下はFeatureとする。

* 新機能
* 新業務シナリオ
* UX改善
* 利用者が認識できる価値追加

以下はIssue管理とする。

* バグ修正
* リファクタリング
* 技術的負債解消
* 性能改善
* ログ改善
* 監視改善

---

# 12. Feature Index

```markdown
| Feature ID | Feature名 | Capability | Epic ID | MVP区分 | 優先度 | 状態 | MVP完了条件 |
|------------|------------|------------|------------|------------|------------|------------|------------|
| F-CARD-001 | カードケース表示 | ポイントカード基盤 | EP-CARD-001 | MVP | High | Released | カード一覧表示可能 |
| F-POINT-001 | 来店ポイント発行 | ポイントカード基盤 | EP-ENGAGEMENT-001 | MVP | High | Approved | ポイント発行可能 |
```

---

# 13. 運用ルール

## Feature追加

1. feature-indexへ追加
2. Feature詳細作成
3. MVP区分設定
4. MVP完了条件定義
5. Story候補作成
6. Screen Impact作成
7. PO承認

---

## Feature変更

1. Feature詳細更新
2. MVP完了条件確認
3. Story更新
4. Screen Impact更新
5. 変更履歴更新

---

## Feature完了

以下を満たした場合Doneとする。

1. MVP完了条件を満たす
2. MVP対象Storyが完了
3. テスト完了
4. PO承認

---

# 14. 基本思想

Featureは進捗管理単位ではなく価値管理単位である。

進捗はStoryで管理し、Featureはユーザー価値・MVP範囲・画面影響・受入条件を管理する。

生成AIはFeatureを中心としてStory・画面設計・実装・テストの整合性を維持すること。
