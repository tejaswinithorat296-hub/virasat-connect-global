'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS } from '@/data/mockData';
import {
  Eye,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  Layers,
  MapPin,
  Info,
  Maximize2,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';

export const VirtualToursView: React.FC = () => {
  const { speakText, lowBandwidth, setLowBandwidth } = useApp();
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activePoi, setActivePoi] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const tours = [
    {
      id: 'tour-taj',
      title: 'Taj Mahal Imperial Gateway & Main Plinth Walkthrough',
      monument: 'Taj Mahal, Agra, India',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
      audioTranscript: 'You are standing on the red sandstone Darwaza-i-Rauza (Great Gate). Before you stretches the Charbagh quadripartite paradise garden, bisected by reflecting water canals mirroring the central mausoleum dome.',
      pois: [
        { id: 'poi-1', x: 50, y: 35, title: 'Central Onion Dome (Amrud)', desc: 'Rises 35 meters in pure white Makrana marble, flanked by four smaller domed chattris.' },
        { id: 'poi-2', x: 28, y: 65, title: 'Reflecting Water Pool (Hawd al-Kawthar)', desc: 'Aligned precisely along the central axis to reflect the complete silhouette under changing daylight.' },
        { id: 'poi-3', x: 82, y: 45, title: 'Tilted Minarets', desc: 'Each 40-meter minaret is constructed with a 3-degree outward tilt to safeguard the tomb against seismic shocks.' }
      ]
    },
    {
      id: 'tour-machu',
      title: 'Machu Picchu Sacred Plaza & Intihuatana Hill',
      monument: 'Machu Picchu, Cusco, Peru',
      imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80',
      audioTranscript: 'Welcome to the Sacred Plaza of Machu Picchu. Surrounding you are the Main Temple, the Temple of the Three Windows, and the residential quarters harmonizing with the granite bedrock of the Andes.',
      pois: [
        { id: 'poi-4', x: 45, y: 40, title: 'Intihuatana Stone', desc: 'Astronomical sundial and calendar used by Inca priests to track solar solstices.' },
        { id: 'poi-5', x: 70, y: 75, title: 'Agricultural Terraces', desc: 'Stone-walled terraces with layered gravel and soil for drainage and microclimate temperature regulation.' }
      ]
    },
    {
      id: 'tour-giza',
      title: 'Giza Necropolis & Great Sphinx Panorama',
      monument: 'Pyramids of Giza, Egypt',
      imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80',
      audioTranscript: 'You stand before the Giza Plateau, the monumental cemetery of Old Kingdom pharaohs. The Sphinx, carved from a single limestone ridge, faces directly eastward toward the rising sun.',
      pois: [
        { id: 'poi-6', x: 50, y: 30, title: 'Great Pyramid of Khufu', desc: 'Constructed of 2.3 million stone blocks aligned to true north with astronomical precision.' },
        { id: 'poi-7', x: 30, y: 60, title: 'The Great Sphinx of Giza', desc: 'Mythological creature with the body of a lion and the head of Pharaoh Khafre.' }
      ]
    }
  ];

  const currentTour = tours[selectedTourIndex];

  const handleRotate = (dir: 'left' | 'right') => {
    setRotationAngle(prev => (dir === 'left' ? prev - 15 : prev + 15));
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      speakText(currentTour.audioTranscript);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Immersive 360° Virtual Heritage Walkthroughs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Experience monuments and sacred landscapes with interactive points of interest and multi-lingual audio narration.
          </p>
        </div>

        {/* Low-Bandwidth Mode Indicator */}
        <button
          type="button"
          onClick={() => setLowBandwidth(!lowBandwidth)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
            lowBandwidth
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {lowBandwidth ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          {lowBandwidth ? 'Lite Bandwidth Mode (Active)' : 'High Resolution Mode'}
        </button>
      </div>

      {/* Tour Selection Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {tours.map((t, index) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setSelectedTourIndex(index);
              setActivePoi(null);
              setRotationAngle(0);
              setIsPlayingAudio(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedTourIndex === index
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {t.monument}
          </button>
        ))}
      </div>

      {/* 360° Interactive Canvas Box */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl min-h-[480px]">
        {/* Dynamic Image with Simulated 360 Rotation Transform */}
        <div
          className="w-full h-[480px] bg-slate-950 overflow-hidden relative select-none"
          style={{ cursor: 'grab' }}
        >
          <img
            src={currentTour.imageUrl}
            alt={currentTour.title}
            className="w-full h-full object-cover transition-transform duration-300 filter brightness-90"
            style={{
              transform: `scale(${lowBandwidth ? 1 : 1.15}) rotate(${rotationAngle * 0.05}deg) translateX(${rotationAngle * 2}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Interactive POI Hotspots */}
          {currentTour.pois.map((poi) => (
            <button
              key={poi.id}
              type="button"
              onClick={() => setActivePoi(poi.id)}
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50 animate-bounce hover:scale-125 transition-transform"
              title={poi.title}
            >
              <Info className="w-3.5 h-3.5 font-bold" />
            </button>
          ))}

          {/* Active POI Callout Card */}
          {activePoi && (
            <div className="absolute top-6 left-6 max-w-sm bg-slate-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-2xl z-30 backdrop-blur-md">
              {(() => {
                const poi = currentTour.pois.find(p => p.id === activePoi);
                if (!poi) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                      <span>Point of Interest</span>
                      <button
                        type="button"
                        onClick={() => setActivePoi(null)}
                        className="text-slate-400 hover:text-slate-100"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{poi.title}</h4>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{poi.desc}</p>
                    <button
                      type="button"
                      onClick={() => speakText(poi.desc)}
                      className="mt-3 text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3 h-3" /> Narrate Details
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Floating Controls Bar at Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleRotate('left')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800 transition-colors"
            >
              ⟲ Pan Left
            </button>
            <button
              type="button"
              onClick={() => handleRotate('right')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800 transition-colors"
            >
              Pan Right ⟳
            </button>
            <button
              type="button"
              onClick={() => setRotationAngle(0)}
              className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-slate-200"
              title="Reset Horizon"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-950 text-amber-400 border border-amber-500/30'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              {isPlayingAudio ? 'Stop Narration' : 'Play Official Audio Guide'}
            </button>
          </div>
        </div>
      </div>

      {/* Audio Guide Transcript */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
        <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Official Multilingual Audio Guide Transcript
        </h4>
        <p className="leading-relaxed font-light text-slate-300">
          {currentTour.audioTranscript}
        </p>
      </div>
    </div>
  );
};

