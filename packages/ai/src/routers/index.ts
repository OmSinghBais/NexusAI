export type ModelTier = 'fast' | 'smart' | 'cheap';

export interface ModelRouteRequest {
  tier: ModelTier;
  promptTokens: number;
}

export interface ModelRouteResult {
  provider: string;
  model: string;
}

export function routeModel(request: ModelRouteRequest): ModelRouteResult {
  if (request.tier === 'fast') {
    return { provider: 'openai', model: 'gpt-4o-mini' };
  }
  if (request.tier === 'cheap') {
    return { provider: 'ollama', model: 'llama3' };
  }
  return { provider: 'anthropic', model: 'claude-sonnet-4-20250514' };
}
