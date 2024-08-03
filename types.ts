export interface IStateProfile {
  profile: IProfile;
}
export interface IStateAuth {
  user: IUser;
  token: string;
}
export interface IProfile {
  id: number;
  url: string;
  site: string;
  name: string;
  email: string;
  avatar: boolean;
  is_active: boolean;
  cellphone: string;
  description: string;
  connected_in: string;
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
