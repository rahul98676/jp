
"use client"

import { useState, useEffect } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';

const hiraganaData = [
  { hiragana: 'あ', romaji: 'a' }, { hiragana: 'い', romaji: 'i' }, { hiragana: 'う', romaji: 'u' }, { hiragana: 'え', romaji: 'e' }, { hiragana: 'お', romaji: 'o' },
  { hiragana: 'か', romaji: 'ka' }, { hiragana: 'き', romaji: 'ki' }, { hiragana: 'く', romaji: 'ku' }, { hiragana: 'け', romaji: 'ke' }, { hiragana: 'こ', romaji: 'ko' },
  { hiragana: 'さ', romaji: 'sa' }, { hiragana: 'し', romaji: 'shi' }, { hiragana: 'す', romaji: 'su' }, { hiragana: 'せ', romaji: 'se' }, { hiragana: 'そ', romaji: 'so' },
  { hiragana: 'た', romaji: 'ta' }, { hiragana: 'ち', romaji: 'chi' }, { hiragana: 'つ', romaji: 'tsu' }, { hiragana: 'て', romaji: 'te' }, { hiragana: 'と', romaji: 'to' },
  { hiragana: 'な', romaji: 'na' }, { hiragana: 'に', romaji: 'ni' }, { hiragana: 'ぬ', romaji: 'nu' }, { hiragana: 'ね', romaji: 'ne' }, { hiragana: 'の', romaji: 'no' },
  { hiragana: 'は', romaji: 'ha' }, { hiragana: 'ひ', romaji: 'hi' }, { hiragana: 'ふ', romaji: 'fu' }, { hiragana: 'へ', romaji: 'he' }, { hiragana: 'ほ', romaji: 'ho' },
  { hiragana: 'ま', romaji: 'ma' }, { hiragana: 'み', romaji: 'mi' }, { hiragana: 'む', romaji: 'mu' }, { hiragana: 'め', romaji: 'me' }, { hiragana: 'も', romaji: 'mo' },
  { hiragana: 'や', romaji: 'ya' }, { hiragana: 'ゆ', romaji: 'yu' }, { hiragana: 'よ', romaji: 'yo' },
  { hiragana: 'ら', romaji: 'ra' }, { hiragana: 'り', romaji: 'ri' }, { hiragana: 'る', romaji: 'ru' }, { hiragana: 'れ', romaji: 're' }, { hiragana: 'ろ', romaji: 'ro' },
  { hiragana: 'わ', romaji: 'wa' }, { hiragana: 'を', romaji: 'wo' }, { hiragana: 'ん', romaji: 'n' }
];

export default function Hiragana() {
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

  const currentCard = hiraganaData[currentIndex];

  const playSound = (romaji: string) => {
    // Use Web Speech API with Japanese pronunciation
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new window.SpeechSynthesisUtterance(romaji);
      utterance.lang = 'ja-JP'; // Japanese language
      utterance.rate = 0.7; // Slower for learning
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.9;

      // Try to use a Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const japaneseVoice = voices.find(
        (voice) =>
          (voice.lang && voice.lang.includes('ja')) ||
          (voice.name && voice.name.includes('Japanese'))
      );

      if (japaneseVoice) {
        utterance.voice = japaneseVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % hiraganaData.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + hiraganaData.length) % hiraganaData.length);
    setShowAnswer(false);
  };

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * hiraganaData.length);
    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Hiragana Learning
        </h1>
        
        {/* Progress */}
        <div className="text-center mb-6 text-sm text-gray-500">
          {currentIndex + 1} / {hiraganaData.length}
        </div>

        {/* Main Card */}
        <div className="text-center mb-8">
          <div className="text-8xl font-light mb-4 text-gray-800">
            {currentCard.hiragana}
          </div>
          
          {showAnswer && (
            <div className="text-3xl font-semibold text-blue-600 mb-4">
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
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {showAnswer ? 'Hide' : 'Show'} Answer
            </button>
            <button
              onClick={randomCard}
              className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition-colors"
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
            {hiraganaData.map((char, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowAnswer(false);
                }}
                className={`aspect-square text-sm border rounded transition-colors ${
                  index === currentIndex 
                    ? 'bg-blue-500 text-black border-blue-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {char.hiragana}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}