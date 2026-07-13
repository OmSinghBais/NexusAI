# Agent Memory System

## Overview
The memory system provides AIOS agents with context awareness, enabling them to learn from past interactions, maintain continuity in long-running tasks, and access vast amounts of enterprise knowledge.

## Memory Architecture

### 1. Short-Term Memory (Working Memory)
Maintains the immediate context of the current conversation or task execution.
- **Implementation**: In-memory data structures (e.g., Redis or local process memory).
- **Scope**: Tied to a specific session or active thread.
- **Eviction**: Uses sliding window algorithms or token-based truncation to stay within LLM context limits.

### 2. Long-Term Memory (Episodic & Semantic)
Stores historical interactions, learned facts, and enterprise data across sessions.
- **Episodic Memory**: Records of past conversations and actions (What happened and when).
- **Semantic Memory**: Factual knowledge extracted from documents and interactions.
- **Storage Strategy**: Relational databases for metadata and Vector Databases for semantic search.

## Vector Database Integration (Qdrant)
AIOS utilizes Qdrant as its core vector search engine for long-term memory retrieval.

### Architecture
- **Embedding Generation**: Text and multimodal data are converted into dense vector embeddings using models like OpenAI's `text-embedding-3-small` or open-source alternatives.
- **Indexing**: Qdrant stores vectors alongside rich JSON payloads (metadata such as timestamp, agent ID, task ID, and source document).
- **Retrieval**: Agents perform similarity search (k-NN) combined with payload filtering.

### Retrieval-Augmented Generation (RAG) Flow
1. **Query Formulation**: Agent formulates a search query based on missing information in its context.
2. **Embedding**: Query is vectorized.
3. **Search**: Qdrant is queried for the top-k most semantically similar memories, filtered by relevant metadata (e.g., `user_id == 123`).
4. **Injection**: Retrieved context is injected into the agent's prompt for reasoning.

## Memory Consolidation
To prevent unbounded growth and improve retrieval quality:
- **Summarization**: Background processes periodically summarize older short-term memory transcripts into dense, long-term memories.
- **Decay/Relevance Scoring**: Older or less frequently accessed memories may be assigned lower relevance weights unless explicitly reinforced.
