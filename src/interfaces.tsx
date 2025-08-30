export interface IFactions {
    name: string,
    namePtBr: string,
    description: string[],
}

export interface IHouses {
    number: number,
    name: string,
    namePtBr: string,
    description: string[],
    factions: string[],
    preludio: string[],
    faith: string[],
    playerCreation: string[],
    initialTorment: number,
    doctrines: string[],
    fraquezas: string[],
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