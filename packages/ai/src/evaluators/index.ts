export interface EvaluationScore {
  metric: string;
  value: number;
}

export function evaluateStub(): EvaluationScore[] {
  return [{ metric: 'quality', value: 1 }];
}
