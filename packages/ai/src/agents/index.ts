export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
}

export function defineAgent(definition: AgentDefinition): AgentDefinition {
  return definition;
}
