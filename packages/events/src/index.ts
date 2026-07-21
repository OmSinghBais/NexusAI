export interface DomainEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  id: string;
  type: string;
  occurredAt: string;
  aggregateId: string;
  payload: TPayload;
}

export const EVENT_TOPICS = {
  AGENT_CREATED: 'agent.created',
  TASK_CREATED: 'task.created',
  WORLD_TICK: 'world.tick',
  CITIZEN_ACTION: 'citizen.action',
} as const;

export type EventTopic = (typeof EVENT_TOPICS)[keyof typeof EVENT_TOPICS];
