export interface PlannerInput {
  task: string;
  context?: Record<string, unknown>;
}

export interface PlannerOutput {
  steps: string[];
}

export function createPlannerStub(): {
  plan(input: PlannerInput): PlannerOutput;
} {
  return {
    plan(input: PlannerInput): PlannerOutput {
      return { steps: [`Analyze: ${input.task}`, 'Select agents', 'Execute', 'Respond'] };
    },
  };
}
