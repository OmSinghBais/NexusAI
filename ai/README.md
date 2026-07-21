# AI module layout

Implementation lives in the workspace package [`packages/ai`](../packages/ai).

```
packages/ai/src/
├── planners/
├── routers/
├── prompts/
├── agents/
├── reasoning/
├── memory/
├── embeddings/
├── evaluators/
└── providers/
```

Import in applications:

```ts
import { routeModel, PROMPT_REGISTRY } from '@nexusai/ai';
```
