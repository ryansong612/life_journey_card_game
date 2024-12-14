import React from 'react';

interface CardProps {
  title: string;
  content?: string;
  type: 'life' | 'setback';
  isSelected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ title, content, type, isSelected, onClick }) => {
  const baseClasses = "w-48 h-64 rounded-lg p-4 shadow-lg transition-all cursor-pointer";
  const typeClasses = type === 'life' 
    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
    : "bg-gradient-to-br from-rose-500 to-pink-600 text-white";
  const selectedClasses = isSelected 
    ? "ring-4 ring-yellow-400 transform scale-105 shadow-xl" 
    : "hover:scale-105";

  return (
    <div 
      className={`${baseClasses} ${typeClasses} ${selectedClasses}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {content && <p className="text-sm">{content}</p>}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
};