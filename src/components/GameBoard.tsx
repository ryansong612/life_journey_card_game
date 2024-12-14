import React, { useState, useEffect } from 'react';
import { PlayerHand } from './PlayerHand';
import { SetbackChoice } from './SetbackChoice';
import { GameControls } from './GameControls';
import { Player, SetbackCard, LifeCard, GameState } from '../types/cards';
import { createSelectionDeck, createSetbackDeck, shuffleDeck, drawInitialHand } from '../utils/deckUtils';
import { acceptSetbackCard, removeLifeCards } from '../utils/gameActions';

interface GameBoardProps {
  playerCount: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ playerCount }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentSetback, setCurrentSetback] = useState<SetbackCard | null>(null);
  const [setbackDeck, setSetbackDeck] = useState<SetbackCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<LifeCard[]>([]);

  useEffect(() => {
    initializeGame();
  }, [playerCount]);

  const initializeGame = () => {
    const selectionDeck = createSelectionDeck();
    const shuffledSetbackDeck = shuffleDeck(createSetbackDeck());
    
    const newPlayers = Array.from({ length: playerCount }, (_, i) => ({
      id: `player-${i}`,
      name: `Player ${i + 1}`,
      lifeCards: drawInitialHand(selectionDeck, 10),
      setbackCards: []
    }));

    setPlayers(newPlayers);
    setSetbackDeck(shuffledSetbackDeck);
    setGameState('playing');
    setCurrentPlayer(0);
    setSelectedCards([]);
  };

  const drawSetbackCard = () => {
    if (setbackDeck.length === 0) return;
    const [card, ...remainingDeck] = setbackDeck;
    setCurrentSetback(card);
    setSetbackDeck(remainingDeck);
  };

  const handleAcceptSetback = () => {
    if (!currentSetback) return;
    setPlayers(acceptSetbackCard(players, currentPlayer, currentSetback));
    setCurrentSetback(null);
    setSelectedCards([]);
    nextTurn();
  };

  const handleCardSelect = (card: LifeCard) => {
    if (selectedCards.length < 2 && !selectedCards.find(c => c.id === card.id)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleConfirmCards = () => {
    if (selectedCards.length !== 2) return;
    setPlayers(removeLifeCards(players, currentPlayer, selectedCards));
    setCurrentSetback(null);
    setSelectedCards([]);
    nextTurn();
  };

  const handleCancelSelection = () => {
    setSelectedCards([]);
  };

  const nextTurn = () => {
    setCurrentPlayer((currentPlayer + 1) % playerCount);
  };

  const endGame = () => {
    setGameState('finished');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {gameState === 'playing' && (
          <>
            <GameControls
              onEndGame={endGame}
              currentPlayer={currentPlayer}
              onDrawCard={drawSetbackCard}
              hasSetback={!!currentSetback}
            />

            {currentSetback && (
              <div className="mb-8">
                <SetbackChoice
                  setback={currentSetback}
                  selectedCards={selectedCards}
                  onAcceptSetback={handleAcceptSetback}
                  onConfirmCards={handleConfirmCards}
                  onCancelSelection={handleCancelSelection}
                />
              </div>
            )}

            <div className="space-y-8">
              {players.map((player, index) => (
                <PlayerHand
                  key={player.id}
                  player={player}
                  isActive={index === currentPlayer}
                  selectedCards={index === currentPlayer ? selectedCards : []}
                  onLifeCardSelect={index === currentPlayer ? handleCardSelect : undefined}
                />
              ))}
            </div>
          </>
        )}

        {gameState === 'finished' && (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};