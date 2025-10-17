export interface IFactions {
  name: string;
  namePtBr: string;
  description: string[];
  rivals: string[];
  houses: string[];
  leaders: string[];
  objectives: string[];
}

export interface IHouses {
  number: number;
  name: string;
  namePtBr: string;
  description: string[];
  factions: string[];
  preludio: string[];
  faith: string[];
  playerCreation: string[];
  initialTorment: number;
  doctrines: string[];
  fraquezas: string[];
}

export interface IListDoctrines {
  level: number;
  name: string;
  description: string;
  system: string;
  torment: string;
}

export interface IListApocaliptycForm {
  torment: boolean;
  name: string;
  description: string;
}

export interface IDoctrines {
  id: string;
  name: string;
  belonging: string;
  doctrines: IListDoctrines[];
  apName: string,
  apWithoutTorment: string,
  apWithTorment: string,
  apocalypticForm: IListApocaliptycForm[];
}

export interface IAuthData {
  email: string;
  displayName: string;
}

export interface IMessage {
  show: boolean;
  text: string;
}

export interface IUser {
  id: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  imageURL: string;
}
