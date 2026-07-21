export type LlmProviderId = 'openai' | 'gemini' | 'anthropic' | 'ollama';

export interface LlmProviderConfig {
  id: LlmProviderId;
  enabled: boolean;
}

export const DEFAULT_PROVIDERS: LlmProviderConfig[] = [
  { id: 'openai', enabled: true },
  { id: 'gemini', enabled: true },
  { id: 'anthropic', enabled: true },
  { id: 'ollama', enabled: true },
];
