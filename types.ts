export interface IStateProfile {
  profile: IProfile;
}

export interface IProfile {
  id: number;
  url: string;
  site: string;
  name: string;
  email: string;
  status: string;
  cellphone: string;
  description: string;
  connected_in: string;
}