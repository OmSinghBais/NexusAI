# AIOS Context Rules & Domain Knowledge

## Introduction

This document provides essential context and domain knowledge for AI models working on the AIOS codebase. It defines the vocabulary, core concepts, and operational paradigms of the system.

## Domain Vocabulary

- **Agent**: An autonomous or semi-autonomous AI entity designed to perform specific tasks (e.g., DataAnalysisAgent, SupportRoutingAgent).
- **Skill**: A distinct capability that can be loaded into an Agent (e.g., "QuerySQLDatabase", "SendEmail").
- **Workflow**: A predefined sequence of tasks executed by one or more Agents to achieve a business goal.
- **Memory Store**: The persistence layer for Agent context, consisting of short-term (session-based) and long-term (vector embeddings, knowledge graphs) memory.
- **Event Bus**: The central message broker facilitating asynchronous communication between all AIOS components.
- **Workspace**: An isolated environment where a group of agents operate on a specific set of data or projects.

## System Tenets

1. **Deterministic Execution where Required**: While LLMs are probabilistic, the orchestration layer and workflow engine must be deterministic. State transitions must be reliable and reproducible.
2. **Graceful Degradation**: If an external LLM provider goes down, the system should fall back to local models or queue tasks without crashing the core OS.
3. **Auditability**: Every action taken by an Agent must be traceable back to a user request or a scheduled trigger. "Black box" operations are prohibited.

## Development Context

- The primary language for core services is Go/Python (refer to architecture docs for specifics).
- Configuration is managed via YAML and environment variables.
- AI models should prioritize reading interfaces and abstractions rather than deeply coupling to specific implementations of external SDKs.
