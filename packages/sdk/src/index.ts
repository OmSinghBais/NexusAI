export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
  timestamp: string;
}

export interface NexusAiClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class NexusAiClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: NexusAiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async health(): Promise<ApiResponse<{ status: string }>> {
    const response = await this.fetchImpl(`${this.baseUrl}/api/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    return response.json() as Promise<ApiResponse<{ status: string }>>;
  }
}
