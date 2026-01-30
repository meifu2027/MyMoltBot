'use client';

import { useState } from 'react';
import { mockPlaylists, mockSongs } from '../../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Play, Bell, Heart } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/Toast';

export default function HomePage() {
  const { playSong, setPlaylist, toggleFavorite } = usePlayerStore();
  const { toasts, showToast, removeToast } = useToast();
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const featuredPlaylists = showAllPlaylists ? mockPlaylists : mockPlaylists.slice(0, 3);
  const recommendedSongs = showAllSongs ? mockSongs : mockSongs.slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-40">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Play className="w-6 h-6" />
            <span>现在就听</span>
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                showToast(showNotifications ? '通知已隐藏' : '通知已展开', 'info');
              }}
              className="text-white/60 hover:text-white transition-colors relative"
            >
              <Bell className="w-6 h-6" />
              {showNotifications && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => showToast('个人中心功能开发中...', 'info')}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold hover:scale-105 transition-transform"
            >
              M
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        {/* 欢迎区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">下午好</h2>
          <p className="text-white/60 text-lg">发现适合你的音乐</p>
        </motion.div>

        {/* 推荐歌单 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">为你推荐</h3>
            <button
              onClick={() => {
                setShowAllPlaylists(!showAllPlaylists);
                showToast(showAllPlaylists ? '收起歌单' : '展开全部歌单', 'success');
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {showAllPlaylists ? '收起 ↑' : '查看全部 →'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredPlaylists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-xl">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => {
                      setPlaylist(playlist.songs);
                      if (playlist.songs[0]) playSong(playlist.songs[0]);
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity text-gray-900"
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>
                <h4 className="font-semibold truncate">{playlist.name}</h4>
                <p className="text-white/60 text-sm truncate">{playlist.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 新歌速递 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">新歌速递</h3>
            <button
              onClick={() => {
                setShowAllSongs(!showAllSongs);
                showToast(showAllSongs ? '收起歌曲' : '展开全部歌曲', 'success');
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {showAllSongs ? '收起 ↑' : '查看全部 →'}
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {recommendedSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-48 group cursor-pointer"
                onClick={() => playSong(song)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-xl">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-900">
                      <Play className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold truncate">{song.title}</h4>
                <p className="text-white/60 text-sm truncate">{song.artist}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 最近播放 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">最近播放</h3>
            <button className="text-white/60 hover:text-white transition-colors">
              查看全部 →
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-xl">
            {mockSongs.slice(0, 5).map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 py-3 hover:bg-white/5 rounded-xl px-2 cursor-pointer transition-colors"
                onClick={() => playSong(song)}
              >
                <span className="text-white/40 w-6 text-center">{index + 1}</span>
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{song.title}</p>
                  <p className="text-white/60 text-sm truncate">{song.artist}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song.id);
                    showToast(song.isFavorite ? '已取消收藏' : '已添加到收藏', 'success');
                  }}
                  className={`transition-colors ${song.isFavorite ? 'text-red-500' : 'text-white/60 hover:text-red-500'}`}
                >
                  <Heart className={`w-6 h-6 ${song.isFavorite ? 'fill-current' : ''}`} />
                </button>
                <span className="text-white/40 text-sm">
                  {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Toast 通知 */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
