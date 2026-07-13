# Docker Architecture and Specifications

## 1. Overview
This document details the Dockerization strategy for the AIOS project, covering Dockerfile design principles, multi-stage builds, base image selection, and the Docker Compose architecture used for local development and testing.

## 2. Dockerfile Design Principles
All services within the AIOS ecosystem are containerized. Dockerfiles must adhere to the following best practices to ensure security, performance, and maintainability.

### 2.1 Multi-Stage Builds
Multi-stage builds are mandatory for all compiled or transpiled languages (e.g., TypeScript, Go, Java, Rust).
*   **Build Stage:** Includes all necessary build tools, SDKs, and dependencies required to compile the application.
*   **Production Stage:** Uses a minimal base image, copying only the compiled artifacts from the build stage. This significantly reduces the final image size and attack surface.

### 2.2 Base Image Selection
*   **Minimize Footprint:** Prefer minimal base images such as Alpine Linux or distroless images whenever possible.
*   **Official Images:** Use official images from verified publishers on Docker Hub or cloud registries (e.g., `node:20-alpine`, `python:3.11-slim`).
*   **Specific Tags:** Never use the `latest` tag. Always pin base images to specific versions (e.g., `18.17.0-alpine`) to guarantee reproducible builds.

### 2.3 Layer Optimization
*   **Dependency Caching:** Copy dependency manifests (e.g., `package.json`, `requirements.txt`) and install dependencies *before* copying the application source code. This leverages Docker's layer caching mechanism, speeding up subsequent builds when only source code changes.
*   **Consolidate RUN Commands:** Chain commands using `&&` to reduce the number of layers created, especially when updating package managers and installing system dependencies, followed by cleaning up caches in the same step.

### 2.4 Security and Permissions
*   **Non-Root User:** Containers must not run as the root user. Define and switch to a dedicated, least-privileged user (e.g., `USER node` or create a custom `appuser`) before the `CMD` or `ENTRYPOINT`.
*   **Avoid Secrets in Dockerfiles:** Never hardcode secrets, API keys, or credentials in Dockerfiles. Use environment variables injected at runtime or secure secret management solutions.

## 3. Example Dockerfile (Node.js/TypeScript Backend)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
# Run as non-root user
USER node
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## 4. Docker Compose Architecture (Local Development)
Docker Compose is utilized to orchestrate the AIOS multi-service architecture for local development, enabling developers to spin up the entire stack or subsets of it with a single command.

### 4.1 `docker-compose.yml` Structure
*   **Services:** Defines all application components (API gateways, microservices, frontend) and infrastructure dependencies (databases, message brokers, caching).
*   **Networks:** Uses a custom bridge network (e.g., `aios-network`) to facilitate communication between services using container names as DNS hostnames.
*   **Volumes:**
    *   **Named Volumes:** Used for persisting data for databases (e.g., PostgreSQL data directory) across container restarts.
    *   **Bind Mounts:** Used for mapping local source code directories into containers, enabling hot-reloading during development without rebuilding images.

### 4.2 Profiles and Overrides
*   **Profiles:** Group services logically (e.g., `core`, `ai-models`, `frontend`). Developers can start specific profiles based on their task (e.g., `docker compose --profile core up`).
*   **Overrides:** A `docker-compose.override.yml` file is used to customize local environments (e.g., exposing debugging ports, changing volume mounts) without modifying the base `docker-compose.yml` shared in version control.

## 5. Image Registry and Tagging Strategy
*   **Registry:** Images are stored in a secure, private container registry.
*   **Tagging Convention:**
    *   `[commit-sha]`: Unique identifier for every build.
    *   `v[major].[minor].[patch]`: Semantic versioning for stable releases.
    *   `[environment]-latest`: E.g., `staging-latest`, updated automatically on successful deployments to specific environments.
