# Centralized Logging Specifications

## 1. Overview
This document describes the centralized logging architecture for the AIOS platform. Effective logging is critical for debugging, security auditing, and operational intelligence. We utilize a structured logging approach and a scalable aggregation stack (e.g., Loki or ELK/EFK).

## 2. Logging Architecture
The AIOS logging pipeline consists of three main stages: Generation, Collection/Forwarding, and Aggregation/Storage/Visualization.

### 2.1 Collection and Forwarding (Log Agents)
Logs are not written to files inside containers. Instead, applications write to `stdout` and `stderr`.
*   **DaemonSet Deployment:** A log collection agent (e.g., Fluent Bit, Promtail, or Filebeat) runs as a DaemonSet on every Kubernetes node.
*   **Capture:** The agent captures container logs from the Docker/containerd runtime log directories on the host node.
*   **Enrichment:** The agent enriches log entries with Kubernetes metadata (namespace, pod name, container name, labels) before forwarding them to the central aggregator.

### 2.2 Aggregation and Storage Stack Selection
Depending on the specific deployment scale and requirements, AIOS utilizes either Grafana Loki or the Elastic Stack (ELK/EFK).

*   **Grafana Loki (Preferred for Cloud-Native):**
    *   Cost-effective as it only indexes labels (metadata), storing the log message as compressed text in object storage (S3/GCS).
    *   Integrates seamlessly with Grafana, allowing correlation between metrics and logs using the same label taxonomy.
*   **Elastic Stack (Elasticsearch, Logstash/Fluentd, Kibana):**
    *   Indexes the entire log payload, providing powerful full-text search capabilities and complex aggregations.
    *   Better suited for complex security auditing and business intelligence use cases requiring deep text analysis.

## 3. Structured Logging Standard
To enable efficient parsing, searching, and filtering, all AIOS applications must emit logs in structured JSON format.

### 3.1 Mandatory Fields
Every log entry must contain the following fields:
*   `timestamp`: ISO 8601 formatted timestamp (UTC).
*   `level`: Log severity (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`).
*   `service`: Name of the service emitting the log (e.g., `user-auth-service`).
*   `message`: Human-readable description of the event.

### 3.2 Contextual Fields (Optional but Recommended)
*   `trace_id`: OpenTelemetry Trace ID for correlating logs with distributed traces.
*   `user_id`: ID of the user performing the action (if authenticated).
*   `tenant_id`: ID of the tenant (for multi-tenant environments).
*   `request_id`: Unique identifier for the incoming HTTP request.
*   `error`: Stack trace or detailed error message (for `ERROR` and `FATAL` levels).

**Example Log Entry:**
```json
{
  "timestamp": "2026-07-13T10:15:30.123Z",
  "level": "ERROR",
  "service": "model-inference-api",
  "message": "Failed to connect to GPU backend",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "error": "Connection timeout after 5000ms"
}
```

## 4. Log Levels and Usage
*   **DEBUG:** Verbose information for local development and troubleshooting specific issues. Disabled in production.
*   **INFO:** General operational events (service started, config loaded, request processed).
*   **WARN:** Unexpected situations that do not immediately impact system stability but require monitoring (e.g., API rate limit approached, deprecated feature used).
*   **ERROR:** Operation failures that impact a specific transaction or user request, but the service remains running (e.g., database query failed).
*   **FATAL:** Critical failures causing the service to crash or become entirely unavailable.

## 5. Security and Data Privacy
*   **PII Redaction:** Personally Identifiable Information (PII), passwords, API keys, and sensitive financial data MUST NEVER be logged. Application logging libraries or log forwarders must implement masking/redaction rules before logs are transmitted.
*   **Access Control:** Access to the central logging system must be restricted using RBAC, ensuring developers only see logs relevant to their services.
*   **Retention Policies:** Log retention is configured based on compliance requirements and storage costs:
    *   Hot Storage (Searchable): 7-30 days.
    *   Cold Storage (Archive): Forwarded to object storage (S3 Glacier) for long-term retention (e.g., 1-7 years) for audit purposes.
