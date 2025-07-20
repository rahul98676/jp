// import Link from "next/link"





// export default function about(){
//     return (
//         <h1> 
//              <Link rel="stylesheet" href="hiragana" >hiragana</Link><br />
//              <Link rel="stylesheet" href="katagana" >katagana</Link>
//         </h1>
//     )
// }

"use client"
import Link from "next/link";
import { BookOpen, Zap, Star, ArrowRight, Volume2, Brain } from 'lucide-react';

export default function About() {
  const learningPaths = [
    {
      title: "Hiragana",
      subtitle: "Basic Japanese Script",
      description: "Master the fundamental phonetic script used in Japanese writing",
      href: "hiragana",
      color: "from-blue-500 to-purple-600",
      hoverColor: "hover:from-blue-600 hover:to-purple-700",
      accent: "bg-blue-100 text-blue-600",
      characters: ["あ", "か", "さ", "た", "な"],
      features: ["46 characters", "Native pronunciation", "Interactive learning"]
    },
    {
      title: "Katagana", 
      subtitle: "Foreign Words Script",
      description: "Learn the script for foreign words, technical terms, and emphasis",
      href: "katagana",
      color: "from-pink-500 to-orange-600",
      hoverColor: "hover:from-pink-600 hover:to-orange-700", 
      accent: "bg-pink-100 text-pink-600",
      characters: ["ア", "カ", "サ", "タ", "ナ"],
      features: ["46 characters", "Japanese pronunciation", "Modern usage"]
    },
    {
      title: "Kanji",
      subtitle: "Chinese Characters",
      description: "Explore the ideographic characters that form the core of Japanese meaning",
      href: "kanji",
      color: "from-emerald-500 to-teal-600",
      hoverColor: "hover:from-emerald-600 hover:to-teal-700",
      accent: "bg-emerald-100 text-emerald-600",
      characters: ["日", "本", "人", "水", "火"],
      features: ["2000+ characters", "Multiple readings", "Meaning-based"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-6xl text-gray-100 font-light opacity-50">あ</div>
        <div className="absolute top-40 right-32 text-7xl text-gray-100 font-light opacity-40">ア</div>
        <div className="absolute bottom-32 left-16 text-5xl text-gray-100 font-light opacity-60">か</div>
        <div className="absolute bottom-20 right-20 text-6xl text-gray-100 font-light opacity-45">カ</div>
        <div className="absolute top-60 left-1/2 text-4xl text-gray-100 font-light opacity-55">さ</div>
        <div className="absolute top-32 left-1/3 text-5xl text-gray-100 font-light opacity-50">日</div>
        <div className="absolute bottom-40 right-1/3 text-4xl text-gray-100 font-light opacity-45">本</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-2xl">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Japanese Learning Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master all three Japanese writing systems with interactive learning tools for hiragana, katakana, and kanji
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">2000+</div>
              <div className="text-sm text-gray-500">Total Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-500">Writing Systems</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">∞</div>
              <div className="text-sm text-gray-500">Practice Sessions</div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {learningPaths.map((path, index) => (
            <Link key={path.href} href={path.href}>
              <div className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Character Preview */}
                <div className="absolute top-6 right-6 flex gap-1 opacity-20 group-hover:opacity-30 transition-opacity">
                  {path.characters.map((char, i) => (
                    <span key={i} className="text-2xl font-light text-gray-400">{char}</span>
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${path.accent}`}>
                        Script {index + 1}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{path.title}</h2>
                      <p className="text-lg text-gray-500">{path.subtitle}</p>
                    </div>
                    <ArrowRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={24} />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">{path.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {path.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${path.accent.split(' ')[0]}`}>
                          {i === 0 && <Star size={12} className={path.accent.split(' ')[1]} />}
                          {i === 1 && <Volume2 size={12} className={path.accent.split(' ')[1]} />}
                          {i === 2 && <Brain size={12} className={path.accent.split(' ')[1]} />}
                        </div>
                        <span className="text-gray-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${path.color} ${path.hoverColor} text-white px-6 py-3 rounded-xl font-semibold transition-all group-hover:shadow-lg`}>
                    <Zap size={18} />
                    Start Learning
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin Your Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose your learning path above and start mastering Japanese characters with interactive lessons, 
            native pronunciation, and engaging practice sessions. Progress from basic scripts to complex kanji meanings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Volume2 size={16} className="text-green-500" />
              <span className="text-sm">Native Audio</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Brain size={16} className="text-blue-500" />
              <span className="text-sm">Interactive Learning</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star size={16} className="text-yellow-500" />
              <span className="text-sm">Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}