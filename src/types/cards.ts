export interface LifeCard {
  id: string;
  type: string;
  name: string;
}

export interface SetbackCard {
  id: string;
  type: string;
  content: string;
  ageGroup: string;
}

export interface Player {
  id: string;
  name: string;
  lifeCards: LifeCard[];
  setbackCards: SetbackCard[];
}

export type GameState = 'waiting' | 'playing' | 'finished';