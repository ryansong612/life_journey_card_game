import React from 'react';
import { Card } from './Card';
import { LifeCard, SetbackCard } from '../types/cards';

interface PlayerHandProps {
  player: {
    name: string;
    lifeCards: LifeCard[];
    setbackCards: SetbackCard[];
  };
  isActive: boolean;
  selectedCards?: LifeCard[];
  onLifeCardSelect?: (card: LifeCard) => void;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ 
  player, 
  isActive, 
  selectedCards = [],
  onLifeCardSelect 
}) => {
  const isCardSelected = (card: LifeCard) => {
    return selectedCards.some(selected => selected.id === card.id);
  };

  return (
    <div className={`p-4 rounded-lg ${isActive ? 'bg-blue-50' : 'bg-gray-50'}`}>
      <h2 className="text-xl font-bold mb-4">{player.name}'s Hand</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Life Cards</h3>
          <div className="flex flex-wrap gap-4">
            {player.lifeCards.map((card) => (
              <Card
                key={card.id}
                title={card.type}
                type="life"
                isSelected={isCardSelected(card)}
                onClick={() => onLifeCardSelect?.(card)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Setback Cards</h3>
          <div className="flex flex-wrap gap-4">
            {player.setbackCards.map((card) => (
              <Card
                key={card.id}
                title={card.type}
                content={`Age: ${card.ageGroup}`}
                type="setback"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};