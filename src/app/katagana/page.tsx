"use client"
import { useState, useEffect } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';

const katakanaData = [
  { katakana: 'ア', romaji: 'a' }, { katakana: 'イ', romaji: 'i' }, { katakana: 'ウ', romaji: 'u' }, { katakana: 'エ', romaji: 'e' }, { katakana: 'オ', romaji: 'o' },
  { katakana: 'カ', romaji: 'ka' }, { katakana: 'キ', romaji: 'ki' }, { katakana: 'ク', romaji: 'ku' }, { katakana: 'ケ', romaji: 'ke' }, { katakana: 'コ', romaji: 'ko' },
  { katakana: 'サ', romaji: 'sa' }, { katakana: 'シ', romaji: 'shi' }, { katakana: 'ス', romaji: 'su' }, { katakana: 'セ', romaji: 'se' }, { katakana: 'ソ', romaji: 'so' },
  { katakana: 'タ', romaji: 'ta' }, { katakana: 'チ', romaji: 'chi' }, { katakana: 'ツ', romaji: 'tsu' }, { katakana: 'テ', romaji: 'te' }, { katakana: 'ト', romaji: 'to' },
  { katakana: 'ナ', romaji: 'na' }, { katakana: 'ニ', romaji: 'ni' }, { katakana: 'ヌ', romaji: 'nu' }, { katakana: 'ネ', romaji: 'ne' }, { katakana: 'ノ', romaji: 'no' },
  { katakana: 'ハ', romaji: 'ha' }, { katakana: 'ヒ', romaji: 'hi' }, { katakana: 'フ', romaji: 'fu' }, { katakana: 'ヘ', romaji: 'he' }, { katakana: 'ホ', romaji: 'ho' },
  { katakana: 'マ', romaji: 'ma' }, { katakana: 'ミ', romaji: 'mi' }, { katakana: 'ム', romaji: 'mu' }, { katakana: 'メ', romaji: 'me' }, { katakana: 'モ', romaji: 'mo' },
  { katakana: 'ヤ', romaji: 'ya' }, { katakana: 'ユ', romaji: 'yu' }, { katakana: 'ヨ', romaji: 'yo' },
  { katakana: 'ラ', romaji: 'ra' }, { katakana: 'リ', romaji: 'ri' }, { katakana: 'ル', romaji: 'ru' }, { katakana: 'レ', romaji: 're' }, { katakana: 'ロ', romaji: 'ro' },
  { katakana: 'ワ', romaji: 'wa' }, { katakana: 'ヲ', romaji: 'wo' }, { katakana: 'ン', romaji: 'n' }
];

export default function Katakana() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const currentCard = katakanaData[currentIndex];



  const playSound = (romaji: string) => {
    // Use Web Speech API with Japanese pronunciation
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(romaji);
      utterance.lang = 'ja-JP'; // Japanese language
      utterance.rate = 0.7; // Slower for learning
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.9;
      
      // Try to use a Japanese voice if available
      const voices = speechSynthesis.getVoices();
      const japaneseVoice = voices.find(voice => 
        voice.lang.includes('ja') || voice.name.includes('Japanese')
      );
      
      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % katakanaData.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + katakanaData.length) % katakanaData.length);
    setShowAnswer(false);
  };

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * katakanaData.length);
    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Katagana Learning
        </h1>
        
        {/* Progress */}
        <div className="text-center mb-6 text-sm text-gray-500">
          {currentIndex + 1} / {katakanaData.length}
        </div>

        {/* Main Card */}
        <div className="text-center mb-8">
          <div className="text-8xl font-light mb-4 text-gray-800">
            {currentCard.katakana}
          </div>
          
          {showAnswer && (
            <div className="text-3xl font-semibold text-pink-600 mb-4">
              {currentCard.romaji}
            </div>
          )}

          {/* Sound Button */}
          <button
            onClick={() => playSound(currentCard.romaji)}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full mb-4 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Play Japanese pronunciation"
          >
            <Volume2 size={24} />
          </button>

          {!voicesLoaded && (
            <p className="text-xs text-gray-500 mb-2">Loading Japanese voices...</p>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {showAnswer ? 'Hide' : 'Show'} Answer
            </button>
            <button
              onClick={randomCard}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors"
              title="Random card"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevCard}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={nextCard}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Character Grid */}
        <div className="mt-8 max-h-40 overflow-y-auto">
          <div className="grid grid-cols-5 gap-1">
            {katakanaData.map((char, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowAnswer(false);
                }}
                className={`aspect-square text-sm border rounded transition-colors ${
                  index === currentIndex 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {char.katakana}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}