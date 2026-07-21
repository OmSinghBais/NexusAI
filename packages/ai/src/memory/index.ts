export interface MemoryRecord {
  id: string;
  content: string;
  embedding?: number[];
}

export interface MemoryStore {
  store(record: MemoryRecord): Promise<void>;
  search(query: string, limit?: number): Promise<MemoryRecord[]>;
}

export function createInMemoryStore(): MemoryStore {
  const records: MemoryRecord[] = [];
  return {
    async store(record: MemoryRecord): Promise<void> {
      records.push(record);
    },
    async search(query: string, limit = 5): Promise<MemoryRecord[]> {
      return records.filter((r) => r.content.includes(query)).slice(0, limit);
    },
  };
}
