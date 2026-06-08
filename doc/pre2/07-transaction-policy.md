# Transaction Policy

## Principle

Transaction開始はServiceのみ

---

禁止

Repositoryでtransaction開始

---

推奨

Service
 ↓
transaction start
 ↓
Repository
 ↓
commit

---

## Example

ポイント付与

- Point作成
- PointHistory作成
- Notification作成

を1Transactionで実施