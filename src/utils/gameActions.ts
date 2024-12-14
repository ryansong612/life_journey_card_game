import { Player, LifeCard, SetbackCard } from '../types/cards';

export const drawCards = (deck: LifeCard[], count: number): [LifeCard[], LifeCard[]] => {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return [drawn, remaining];
};

export const acceptSetbackCard = (
  players: Player[],
  currentPlayer: number,
  setbackCard: SetbackCard
): Player[] => {
  return players.map((player, index) => {
    if (index === currentPlayer) {
      return {
        ...player,
        setbackCards: [...player.setbackCards, setbackCard]
      };
    }
    return player;
  });
};

export const removeLifeCards = (
  players: Player[],
  currentPlayer: number,
  cardsToRemove: LifeCard[]
): Player[] => {
  return players.map((player, index) => {
    if (index === currentPlayer) {
      return {
        ...player,
        lifeCards: player.lifeCards.filter(
          card => !cardsToRemove.find(c => c.id === card.id)
        )
      };
    }
    return player;
  });
};