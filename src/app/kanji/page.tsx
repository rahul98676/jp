
"use client"
import { useState, useEffect } from 'react';
import { Volume2, RotateCcw, BookOpen, Eye, Star, Filter, ChevronDown } from 'lucide-react';

// JLPT N5 level kanji (most basic)
const kanjiData = [
  { kanji: '人', onyomi: 'jin, nin', kunyomi: 'hito', meaning: 'person', grade: 1, strokes: 2, jlpt: 'N5' },
  { kanji: '日', onyomi: 'nichi, jitsu', kunyomi: 'hi, ka', meaning: 'day, sun', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '本', onyomi: 'hon', kunyomi: 'moto', meaning: 'book, origin', grade: 1, strokes: 5, jlpt: 'N5' },
  { kanji: '中', onyomi: 'chuu', kunyomi: 'naka', meaning: 'middle, inside', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '大', onyomi: 'dai, tai', kunyomi: 'oo', meaning: 'big, large', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '小', onyomi: 'shou', kunyomi: 'chii, ko', meaning: 'small, little', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '国', onyomi: 'koku', kunyomi: 'kuni', meaning: 'country', grade: 2, strokes: 8, jlpt: 'N5' },
  { kanji: '年', onyomi: 'nen', kunyomi: 'toshi', meaning: 'year', grade: 1, strokes: 6, jlpt: 'N5' },
  { kanji: '月', onyomi: 'getsu, gatsu', kunyomi: 'tsuki', meaning: 'month, moon', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '時', onyomi: 'ji', kunyomi: 'toki', meaning: 'time', grade: 2, strokes: 10, jlpt: 'N5' },
  { kanji: '分', onyomi: 'bun, fun', kunyomi: 'wa', meaning: 'minute, part', grade: 2, strokes: 4, jlpt: 'N5' },
  { kanji: '上', onyomi: 'jou', kunyomi: 'ue, a', meaning: 'up, above', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '下', onyomi: 'ka, ge', kunyomi: 'shita, sa', meaning: 'down, below', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '左', onyomi: 'sa', kunyomi: 'hidari', meaning: 'left', grade: 1, strokes: 5, jlpt: 'N5' },
  { kanji: '右', onyomi: 'u, yuu', kunyomi: 'migi', meaning: 'right', grade: 1, strokes: 5, jlpt: 'N5' },
  { kanji: '前', onyomi: 'zen', kunyomi: 'mae', meaning: 'front, before', grade: 2, strokes: 9, jlpt: 'N5' },
  { kanji: '後', onyomi: 'go, kou', kunyomi: 'ato, ushi', meaning: 'after, behind', grade: 2, strokes: 9, jlpt: 'N5' },
  { kanji: '手', onyomi: 'shu', kunyomi: 'te', meaning: 'hand', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '足', onyomi: 'soku', kunyomi: 'ashi, ta', meaning: 'foot, leg', grade: 1, strokes: 7, jlpt: 'N5' },
  { kanji: '目', onyomi: 'moku', kunyomi: 'me', meaning: 'eye', grade: 1, strokes: 5, jlpt: 'N5' },
  { kanji: '口', onyomi: 'kou', kunyomi: 'kuchi', meaning: 'mouth', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '耳', onyomi: 'ji', kunyomi: 'mimi', meaning: 'ear', grade: 1, strokes: 6, jlpt: 'N5' },
  { kanji: '水', onyomi: 'sui', kunyomi: 'mizu', meaning: 'water', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '火', onyomi: 'ka', kunyomi: 'hi', meaning: 'fire', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '土', onyomi: 'do, to', kunyomi: 'tsuchi', meaning: 'soil, earth', grade: 1, strokes: 3, jlpt: 'N5' },
  { kanji: '木', onyomi: 'moku, boku', kunyomi: 'ki', meaning: 'tree, wood', grade: 1, strokes: 4, jlpt: 'N5' },
  { kanji: '金', onyomi: 'kin, kon', kunyomi: 'kane', meaning: 'gold, money', grade: 1, strokes: 8, jlpt: 'N5' },
  { kanji: '学', onyomi: 'gaku', kunyomi: 'mana', meaning: 'study, learn', grade: 1, strokes: 8, jlpt: 'N5' },
  { kanji: '生', onyomi: 'sei, shou', kunyomi: 'i, u, ha', meaning: 'life, birth', grade: 1, strokes: 5, jlpt: 'N5' },
  { kanji: '先', onyomi: 'sen', kunyomi: 'saki', meaning: 'ahead, previous', grade: 1, strokes: 6, jlpt: 'N5' }
];

export default function Kanji() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState({ meaning: false, onyomi: false, kunyomi: false });
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [mode, setMode] = useState('learn');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ grade: 'all', strokes: 'all' });
  const [filteredKanji, setFilteredKanji] = useState(kanjiData);

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

  useEffect(() => {
    let filtered = kanjiData;
    
    if (filters.grade !== 'all') {
      filtered = filtered.filter(k => k.grade === parseInt(filters.grade));
    }
    
    if (filters.strokes !== 'all') {
      const strokeRange = filters.strokes.split('-');
      if (strokeRange.length === 2) {
        filtered = filtered.filter(k => k.strokes >= parseInt(strokeRange[0]) && k.strokes <= parseInt(strokeRange[1]));
      }
    }
    
    setFilteredKanji(filtered);
    if (filtered.length > 0) {
      setCurrentIndex(0);
    }
  }, [filters]);

  const currentKanji = filteredKanji[currentIndex];

  const playSound = (text, isJapanese = true) => {
    if ('speechSynthesis' in window && text) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      utterance.volume = 0.9;
      
      if (isJapanese) {
        utterance.lang = 'ja-JP';
        const voices = speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => 
          voice.lang.includes('ja') || voice.name.includes('Japanese')
        );
        if (japaneseVoice) {
          utterance.voice = japaneseVoice;
        }
      } else {
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const nextKanji = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredKanji.length);
    setShowInfo({ meaning: false, onyomi: false, kunyomi: false });
  };

  const prevKanji = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredKanji.length) % filteredKanji.length);
    setShowInfo({ meaning: false, onyomi: false, kunyomi: false });
  };

  const randomKanji = () => {
    const randomIndex = Math.floor(Math.random() * filteredKanji.length);
    setCurrentIndex(randomIndex);
    setShowInfo({ meaning: false, onyomi: false, kunyomi: false });
  };

  const toggleInfo = (type) => {
    setShowInfo(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const showAll = () => {
    setShowInfo({ meaning: true, onyomi: true, kunyomi: true });
  };

  const hideAll = () => {
    setShowInfo({ meaning: false, onyomi: false, kunyomi: false });
  };

  if (!currentKanji) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-gray-600">No kanji found with current filters</p>
          <button 
            onClick={() => setFilters({ grade: 'all', strokes: 'all' })}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-red-600" size={36} />
            Kanji Learning
          </h1>
          
          {/* Mode Toggle */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setMode('learn')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'learn' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Learn Mode
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'quiz' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Quiz Mode
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="mb-4 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 mx-auto"
          >
            <Filter size={16} />
            Filters
            <ChevronDown className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} size={16} />
          </button>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-white rounded-lg p-4 shadow-lg mb-4 inline-block">
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Grade:</label>
                  <select
                    value={filters.grade}
                    onChange={(e) => setFilters(prev => ({ ...prev, grade: e.target.value }))}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Grades</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Strokes:</label>
                  <select
                    value={filters.strokes}
                    onChange={(e) => setFilters(prev => ({ ...prev, strokes: e.target.value }))}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Strokes</option>
                    <option value="1-5">1-5 strokes</option>
                    <option value="6-10">6-10 strokes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500">
            {currentIndex + 1} / {filteredKanji.length} kanji
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Kanji Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Kanji Display */}
              <div className="text-center mb-8">
                <div className="text-9xl font-light mb-4 text-gray-800 leading-none">
                  {currentKanji.kanji}
                </div>
                
                <div className="flex justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Grade {currentKanji.grade}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {currentKanji.strokes} strokes
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {currentKanji.jlpt}
                  </span>
                </div>

                {/* Sound Button */}
                <button
                  onClick={() => playSound(currentKanji.kunyomi)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full mb-6 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                  title="Play pronunciation"
                >
                  <Volume2 size={24} />
                </button>

                {!voicesLoaded && (
                  <p className="text-xs text-gray-500 mb-4">Loading Japanese voices...</p>
                )}
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                {/* Meaning */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Meaning</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => showInfo.meaning && playSound(currentKanji.meaning, false)}
                        className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                        disabled={!showInfo.meaning}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleInfo('meaning')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  {showInfo.meaning && (
                    <p className="text-lg text-gray-600 mt-2">{currentKanji.meaning}</p>
                  )}
                </div>

                {/* On'yomi */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">On'yomi (Chinese reading)</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => showInfo.onyomi && playSound(currentKanji.onyomi)}
                        className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                        disabled={!showInfo.onyomi}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleInfo('onyomi')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  {showInfo.onyomi && (
                    <p className="text-lg text-gray-600 mt-2">{currentKanji.onyomi}</p>
                  )}
                </div>

                {/* Kun'yomi */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Kun'yomi (Japanese reading)</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => showInfo.kunyomi && playSound(currentKanji.kunyomi)}
                        className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                        disabled={!showInfo.kunyomi}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleInfo('kunyomi')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  {showInfo.kunyomi && (
                    <p className="text-lg text-gray-600 mt-2">{currentKanji.kunyomi}</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={showAll}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Show All
                </button>
                <button
                  onClick={hideAll}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Hide All
                </button>
              </div>
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Navigation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-3">
                <button
                  onClick={randomKanji}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  Random
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={prevKanji}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextKanji}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-white rounded-2xl p-6 shadow-lg max-h-80 overflow-y-auto">
              <h3 className="font-semibold mb-4">Kanji List</h3>
              <div className="grid grid-cols-4 gap-2">
                {filteredKanji.map((kanji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setShowInfo({ meaning: false, onyomi: false, kunyomi: false });
                    }}
                    className={`aspect-square text-lg border rounded transition-colors ${
                      index === currentIndex 
                        ? 'bg-red-500 text-white border-red-500' 
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                    title={kanji.meaning}
                  >
                    {kanji.kanji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}