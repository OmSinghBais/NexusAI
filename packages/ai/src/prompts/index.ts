export const PROMPT_REGISTRY = {
  SYSTEM_DEFAULT: 'system/default',
  CITIZEN_DECISION: 'simulation/citizen-decision',
  AGENT_TASK: 'aios/agent-task',
} as const;

export type PromptKey = (typeof PROMPT_REGISTRY)[keyof typeof PROMPT_REGISTRY];

export function getPromptTemplate(key: PromptKey): string {
  return `<!-- prompt:${key} -->`;
}
