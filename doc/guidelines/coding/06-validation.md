# Validation Policy

推奨ライブラリ

zod

---

## Validation Flow

Request
 ↓
Validator
 ↓
DTO
 ↓
Service

---

## Rule

Service内で入力チェックしない

Validation責務はValidatorへ集約する