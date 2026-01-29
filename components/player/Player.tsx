'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '../../lib/types';

export default function Player() {
  const {
    currentSong,
    isPlaying,
    progress,
    volume,
    playMode,
    isLyricsVisible,
    isMinimized,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    setPlayMode,
    toggleFavorite,
    toggleLyrics,
    minimizePlayer,
    maximizePlayer
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = progress * currentSong!.duration;
    }
  }, [progress]);

  const handleTimeUpdate = () => {
    if (audioRef.current && currentSong) {
      const newProgress = audioRef.current.currentTime / currentSong.duration;
      setLocalProgress(newProgress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    seek(newProgress);
    setLocalProgress(newProgress);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayModeIcon = () => {
    switch (playMode) {
      case 'loop':
        return '🔁';
      case 'loop-one':
        return '🔂';
      case 'shuffle':
        return '🔀';
    }
  };

  if (!currentSong) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={next}
      />

      {/* 迷你播放器 */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 p-4 z-50"
          >
            <div className="flex items-center gap-4 max-w-4xl mx-auto">
              <motion.img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-12 h-12 rounded-lg object-cover shadow-lg"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{currentSong.title}</p>
                <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
              </div>
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={maximizePlayer}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white"
              >
                ⬆️
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 全屏播放器 */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 z-50 flex flex-col"
          >
            {/* 顶部栏 */}
            <div className="flex items-center justify-between p-6">
              <button
                onClick={minimizePlayer}
                className="text-white/60 hover:text-white transition-colors"
              >
                ⬇️ 最小化
              </button>
              <div className="text-white/60 text-sm">正在播放</div>
              <button className="text-white/60 hover:text-white transition-colors">
                ⋮
              </button>
            </div>

            {/* 专辑封面 */}
            <div className="flex-1 flex items-center justify-center px-8">
              <motion.img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-full max-w-md aspect-square rounded-3xl shadow-2xl object-cover"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                whileHover={{ scale: 1.02 }}
              />
            </div>

            {/* 歌曲信息 */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 min-w-0 pr-4">
                  <h2 className="text-3xl font-bold text-white mb-2 truncate">
                    {currentSong.title}
                  </h2>
                  <p className="text-lg text-white/60">{currentSong.artist}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(currentSong.id)}
                  className="text-2xl"
                >
                  {currentSong.isFavorite ? '❤️' : '🤍'}
                </button>
              </div>

              {/* 进度条 */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={localProgress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>
                    {currentSong ? formatTime(localProgress * currentSong.duration) : '0:00'}
                  </span>
                  <span>{currentSong ? formatTime(currentSong.duration) : '0:00'}</span>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex items-center justify-center gap-8 mb-6">
                <button
                  onClick={() => setPlayMode(playMode === 'shuffle' ? 'loop' : 'shuffle')}
                  className={`text-2xl ${playMode === 'shuffle' ? 'text-white' : 'text-white/40'}`}
                >
                  🔀
                </button>
                <button
                  onClick={prev}
                  className="text-4xl text-white hover:scale-110 transition-transform"
                >
                  ⏮️
                </button>
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-xl hover:scale-105 transition-transform"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button
                  onClick={next}
                  className="text-4xl text-white hover:scale-110 transition-transform"
                >
                  ⏭️
                </button>
                <button
                  onClick={() => setPlayMode(playMode === 'loop-one' ? 'loop' : 'loop-one')}
                  className={`text-2xl ${playMode === 'loop-one' ? 'text-white' : 'text-white/40'}`}
                >
                  🔂
                </button>
              </div>

              {/* 底部工具 */}
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleLyrics}
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                  📝 {isLyricsVisible ? '隐藏歌词' : '显示歌词'}
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-white/60">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 歌词显示 */}
            <AnimatePresence>
              {isLyricsVisible && currentSong.lyrics && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-xl p-8 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white">歌词</h3>
                    <button
                      onClick={toggleLyrics}
                      className="text-white/60 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
                    {currentSong.lyrics}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
