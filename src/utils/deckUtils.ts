import { LifeCard, SetbackCard } from '../types/cards';
import { LIFE_CARD_TYPES, SETBACK_CARDS } from '../data/cards';

// Create a full deck with 5 copies of each life card type
export const createFullLifeDeck = (): LifeCard[] => {
  return LIFE_CARD_TYPES.flatMap((type, typeIndex) => 
    Array.from({ length: 5 }, (_, copyIndex) => ({
      id: `${type}-${copyIndex}`,
      type,
      name: type
    }))
  );
};

// Create a selection deck with one of each type
export const createSelectionDeck = (): LifeCard[] => {
  return LIFE_CARD_TYPES.map((type) => ({
    id: `${type}`,
    type,
    name: type
  }));
};

// Create setback deck
export const createSetbackDeck = (): SetbackCard[] => {
  return SETBACK_CARDS.map((card, index) => ({
    id: `setback-${index}`,
    ...card
  }));
};

// Fisher-Yates shuffle algorithm
export const shuffleDeck = <T>(deck: T[]): T[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Draw random cards ensuring one of each type
export const drawInitialHand = (selectionDeck: LifeCard[], count: number): LifeCard[] => {
  const shuffledDeck = shuffleDeck([...selectionDeck]);
  return shuffledDeck.slice(0, count);
};