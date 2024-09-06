export type LlmParams = {
  model: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  systemPrompt: string;
  stream: boolean;
};

export type ChatMessage = {
  role: string;
  content: string;
};

export type LoadingType = "idle" | "stream" | "message";

export interface IStateProfile {
  loading: boolean;
  profile: IProfile;
}
export interface IStateAuth {
  user: IUser;
  token: string;
}

export interface IStateAuth {
  user: IUser;
  token: string;
}

export interface IFlows {
  loading: boolean;
  flows: IFlow[];
  selectedNode: any;
  selectedFlow: any;
  flow: IFlow;
  nodes: any[];
  edges: any[];
  commands: any[];
  commandsList: any[];
  modifying: boolean;
  isCreation: boolean;
}

export interface IFlow {
  id: number;
  user_id: number;
  name: string;
  description: string;
  node: string;
  edge: string;
  commands: object;
  is_active: boolean;
  is_public: boolean;
  recovery_flow_id: number;
  finished_flow_id: number;
  recovery_days: number;
  finish_days: number;
  created_at: string;
  updated_at: string;
  type: string | string[];
}

export interface IProfile {
  wuid: string;
  name: string;
  picture: string;
  email: boolean;
  description: string;
  website: string;
  numberExists: boolean;
  isBusiness: boolean;
}

export interface IStateConnection {
  loading: boolean;
  connections: IConnection[];
  connection: IConnection;
  instance: object;
  qrCode: string | null;
  token: string | null;
  ConnectionPayload: IConnectionPayload;
}

export interface IConnection {
  id: number;
  user_id: number;
  flow_id: number;
  name: string;
  description: string;
  connection_key: string;
  token: string;
  type: string;
  is_active: boolean;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface IConnectionPayload {
  name: string;
  description: string;
  connection_key: string;
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  is_active?: number;
  github_id?: any;
  github_token?: any;
  github_refresh_token?: any;
  google_id?: any;
  google_token?: any;
  google_refresh_token?: any;
  x_id?: any;
  x_token?: any;
  x_refresh_token?: any;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
}
