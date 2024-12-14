import React from 'react';
import { XCircle } from 'lucide-react';

interface GameControlsProps {
  onEndGame: () => void;
  currentPlayer: number;
  onDrawCard: () => void;
  hasSetback: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onEndGame,
  currentPlayer,
  onDrawCard,
  hasSetback,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Life Journey Card Game</h1>
        <button
          onClick={onEndGame}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <XCircle size={20} />
          End Game
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Current Turn: Player {currentPlayer + 1}</h2>
        {!hasSetback && (
          <button
            onClick={onDrawCard}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Draw Setback Card
          </button>
        )}
      </div>
    </div>
  );
};