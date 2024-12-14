import React from 'react';
import { Card } from './Card';
import { SetbackCard, LifeCard } from '../types/cards';

interface SetbackChoiceProps {
  setback: SetbackCard;
  selectedCards: LifeCard[];
  onAcceptSetback: () => void;
  onConfirmCards: () => void;
  onCancelSelection: () => void;
}

export const SetbackChoice: React.FC<SetbackChoiceProps> = ({
  setback,
  selectedCards,
  onAcceptSetback,
  onConfirmCards,
  onCancelSelection,
}) => {
  return (
    <div className="flex gap-4 items-start">
      <Card
        title={setback.type}
        content={`Age: ${setback.ageGroup}`}
        type="setback"
      />
      <div className="space-y-2">
        <button
          onClick={onAcceptSetback}
          className="block w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Accept Setback
        </button>
        
        {selectedCards.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Selected {selectedCards.length}/2 cards
            </div>
            {selectedCards.length === 2 && (
              <div className="flex gap-2">
                <button
                  onClick={onConfirmCards}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm Cards
                </button>
                <button
                  onClick={onCancelSelection}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Change Selection
                </button>
              </div>
            )}
          </div>
        )}
        
        {selectedCards.length === 0 && (
          <div className="text-sm text-gray-600">
            Select 2 life cards to counter
          </div>
        )}
      </div>
    </div>
  );
};