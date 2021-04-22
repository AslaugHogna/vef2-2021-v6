// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  allPeople: {people: ICharacter[]; pageInfo: IPaging};
  edges?: {people: ICharacter[]};
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string
  height?: number;
  mass?: number;
  person: {person: ICharacter; id: string; allPeople: {people: ICharacter[]; pageInfo: IPaging} };
}

export interface IFilm {
  id: string;
  
  characterConnection: {characters: ICharacter[]};
  films: string;
  title?: string;
  episodeID?: number;
  openingCrawl?: string;
  characters?: string;
}

export interface IFilmResponse {
  allFilms?: {films: IFilm[]};
  id: string;
  characterConnection?: {characters: ICharacter[]};
  films?: string;
  title?: string;
  episodeID?: number;
  openingCrawl?: string;
  characters?: string;
}
export interface IPeopleResponse {
  allPeople: {people: ICharacter[]; pageInfo: IPaging};
  edges?: {people: ICharacter[]};
  people?: ICharacter;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
  hasNextPage: boolean;
  endCursor: string;
  
}

export interface IPaging {
  hasNextPage: boolean;
  endCursor: string;
  
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti
