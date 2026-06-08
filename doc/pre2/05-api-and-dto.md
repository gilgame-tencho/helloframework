# API and DTO Policy

## DTO Naming

Request

CreateUserRequest
UpdateUserRequest

Response

CreateUserResponse
UserResponse

---

## Controller Rule

ControllerでDTOへ変換する

禁止

service.execute(req.body)

推奨

service.execute(dto)

---

## OpenAPI

docs/openapi/

配下で管理

変更時はOpenAPI更新必須