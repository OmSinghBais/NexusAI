# Authentication and Authorization

## Overview
AIOS ensures secure access to its APIs and resources through standard JSON Web Tokens (JWT) for authentication and a Role-Based Access Control (RBAC) model for authorization.

## Authentication Flow
1. **Login**: Client sends credentials (username/password or OAuth token) to `/api/v1/auth/login`.
2. **Token Generation**: Upon successful verification, the server issues an `access_token` (short-lived, e.g., 15 minutes) and a `refresh_token` (long-lived, e.g., 7 days).
3. **Usage**: The client includes the `access_token` in the `Authorization: Bearer <token>` header of subsequent requests.
4. **Refresh**: When the `access_token` expires, the client sends the `refresh_token` to `/api/v1/auth/refresh` to obtain a new pair.

## JWT Structure
**Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "sub": "user_id_123",
  "email": "user@example.com",
  "roles": ["admin", "editor"],
  "tenantId": "tenant_abc",
  "iat": 1672531200,
  "exp": 1672532100
}
```

## Role-Based Access Control (RBAC)
Access to resources is restricted based on the roles assigned to the user.
- **SuperAdmin**: Full system access, cross-tenant visibility.
- **TenantAdmin**: Full access within a specific tenant.
- **Editor**: Can create and modify workflows and configurations.
- **Viewer**: Read-only access to dashboards and logs.

### Policy Enforcement
Permissions are enforced at the API gateway/middleware level. A mapping of routes to required roles is maintained in the security configuration.

## Security Considerations
- Refresh tokens are stored securely (HTTP-only cookies recommended for web clients) and can be revoked.
- All passwords are hashed using Argon2id.
- Rate limiting is strictly applied to all authentication endpoints to prevent brute-force attacks.
