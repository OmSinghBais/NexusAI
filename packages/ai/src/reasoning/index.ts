export interface ReasoningRequest {
  input: string;
}

export interface ReasoningResponse {
  output: string;
  confidence: number;
}

export function createReasoningStub() {
  return {
    run(request: ReasoningRequest): ReasoningResponse {
      return { output: request.input, confidence: 0.5 };
    },
  };
}
