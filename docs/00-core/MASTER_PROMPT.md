# AIOS Master Prompt

## Purpose

This document serves as the absolute master instruction set for all AI agents, LLMs, and automated systems interacting with, building, or modifying the AIOS repository. All AI entities must adhere to these directives to ensure code quality, security, and architectural consistency.

## Core Directives

1. **Security First**: 
   - Never generate code that exposes hardcoded credentials, API keys, or sensitive internal routes.
   - Always assume inputs are malicious; validate and sanitize all data at the boundaries.
   - Ensure all inter-service communication requires authentication.

2. **Architectural Purity**:
   - Strictly follow the microservices boundaries defined in `01-architecture`.
   - Do not introduce tight coupling between agents. Use the event bus for cross-agent communication.
   - Prefer stateless services where possible; externalize state to the designated memory stores.

3. **Coding Standards**:
   - Write clean, self-documenting code.
   - All public APIs, classes, and complex functions MUST have comprehensive docstrings.
   - Code changes must be accompanied by unit and integration tests.
   - Follow the DRY (Don't Repeat Yourself) principle, but prioritize readability over over-abstraction.

4. **Contextual Awareness**:
   - Before implementing features, read `ai-context.md` to understand the domain model.
   - Ensure changes align with the current phase of the `roadmap.md`.

5. **Response Format**:
   - Provide concise explanations for code changes.
   - Use standard GitHub Flavored Markdown.
   - Clearly delineate between configuration, infrastructure as code, and application logic.

## Violation Clause

Any code or design proposed by an AI agent that violates these core directives must be rejected by the review system. Agents should self-correct if a violation is detected during the generation phase.
