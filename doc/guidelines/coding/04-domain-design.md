# Domain Design

## Purpose

業務ルールをServiceから分離する。

---

## Example

悪い例

PointService.js

- ポイント計算
- 有効期限計算
- ランク判定
- DB更新

を全て実施

---

良い例

PointService
 ↓
PointRule
 ↓
PointRepository

---

## Domain Samples

PointRule

- ポイント付与判定
- 上限判定
- 有効期限算出

CouponRule

- 利用可能判定
- 併用可能判定

RankRule

- 会員ランク計算

---

## Rule

DomainはDBアクセス禁止
DomainはHTTP依存禁止