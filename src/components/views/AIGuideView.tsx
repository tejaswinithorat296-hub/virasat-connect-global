'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  Mic,
  MicOff,
  Globe2,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  suggestedQuestions?: string[];
}

export const AIGuideView: React.FC = () => {
  const { speakText, addPoints } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Namaste & Welcome. I am your multilingual Virasat Guide, trained on UNESCO archives, archaeological dossiers, and global living community histories. How may I illuminate your cultural exploration today?',
      sources: ['UNESCO World Heritage Archives', 'ICOMOS Charters'],
      suggestedQuestions: [
        'What is the architectural difference between Gothic and Dravidian styles?',
        'Tell me the spiritual significance of the Japanese Tea Ceremony.',
        'How was Kente cloth weaving developed in the Ashanti Kingdom?',
        'Create a beginner learning path for Andean civilizations.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI simulation response based on cultural queries
    setTimeout(() => {
      let reply = `Cultural insight regarding "${q}": Throughout global civilization, this practice reflects deep ecological harmony, community storytelling, and artisanal mastery. Historical evidence shows it was preserved across generations through guild apprenticeship and ritual custody.`;
      let sources = ['UNESCO Intangible Cultural Heritage List', 'Global Museum Consortium Archives'];
      let followUps = [
        'Can you explain this for a beginner learning level?',
        'What related monument should I explore next?',
        'How can I support the living artisans of this craft?'
      ];

      if (q.toLowerCase().includes('tea') || q.toLowerCase().includes('japan')) {
        reply = `The Japanese Tea Ceremony (Chadō or Sadō) was codified in the 16th century by Sen no Rikyū. Grounded in Zen mindfulness, it revolves around the four principles: Wa (harmony), Kei (respect), Sei (purity), and Jaku (tranquility). Participants crawl through a low entrance (nijiriguchi) symbolizing that social status and weapons must be left outside.`;
        sources = ['Agency for Cultural Affairs, Japan', 'Urasenke Heritage Records'];
      } else if (q.toLowerCase().includes('kente') || q.toLowerCase().includes('ghana')) {
        reply = `Ashanti Kente cloth weaving originated in Bonwire, Ghana during the 17th century. Woven on traditional narrow strip-looms, each geometric motif and colour represents moral proverbs, clan lineages, and state philosophy. Gold signifies spiritual wealth and royalty; black denotes mature ancestral strength; green represents renewal.`;
        sources = ['National Commission on Culture Ghana', 'Smithsonian Center for Folklife'];
      } else if (q.toLowerCase().includes('gothic') || q.toLowerCase().includes('dravidian')) {
        reply = `While Gothic architecture (12th–16th century Europe) focused on verticality, pointed arches, ribbed vaults, and stained-glass illumination to reach toward heaven, Dravidian architecture (South India) features pyramidical towered gateways (Gopurams), pillared mandapas, and stone temple tanks celebrating cosmological geomancy.`;
        sources = ['Archaeological Survey of India', 'Royal Institute of British Architects'];
      }

      const botMsg: Message = {
        id: 'msg-bot-' + Date.now(),
        sender: 'assistant',
        text: reply,
        sources,
        suggestedQuestions: followUps
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      addPoints(15);
    }, 700);
  };

  const handleVoiceSim = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setInputQuery('Explain the origins of the Day of the Dead in Mexico');
        setIsListening(false);
      }, 1500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-2">
              Virasat AI Cultural Guide
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Verified Curatorial AI
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Multilingual, verified against primary archives, respectful of living communities.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          title="Clear Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((m) => {
          const isBot = m.sender === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-slate-900 border border-slate-800 text-slate-200'
                    : 'bg-amber-500 text-slate-950 font-medium'
                }`}
              >
                {m.text}

                {/* Sources Citation Pill */}
                {isBot && m.sources && m.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Sources:</span>
                    {m.sources.map((src, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bot speech and quick follow-ups */}
              {isBot && (
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => speakText(m.text)}
                    className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Listen
                  </button>

                  {m.suggestedQuestions && m.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 p-3 rounded-2xl bg-slate-900/50 border border-slate-800 w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-indigo-400" />
            Virasat Guide is consulting cultural archives...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-800 shrink-0"
      >
        <button
          type="button"
          onClick={handleVoiceSim}
          className={`p-3 rounded-2xl border transition-all ${
            isListening
              ? 'bg-rose-500 text-slate-950 border-rose-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400'
          }`}
          title={isListening ? 'Listening...' : 'Voice Input (Speech-To-Text)'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask Virasat Guide about any world monument, traditional craft, language, or festival..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
        />

        <button
          type="submit"
          className="p-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

