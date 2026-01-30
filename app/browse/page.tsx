'use client';

import { useState } from 'react';
import { mockPlaylists, mockSongs, mockArtists } from '../../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Play, Bell, Search, Heart } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/Toast';

export default function BrowsePage() {
  const { playSong, setPlaylist, toggleFavorite } = usePlayerStore();
  const { toasts, showToast, removeToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-40">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">浏览</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast('暂无新通知', 'info')}
              className="text-white/60 hover:text-white transition-colors"
            >
              <Bell className="w-6 h-6" />
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
        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3">
            <Search className="w-6 h-6 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索歌曲、歌手、专辑"
              className="flex-1 bg-transparent outline-none text-lg placeholder-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  showToast('搜索已清空', 'info');
                }}
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                清空
              </button>
            )}
          </div>
        </div>

        {/* 排行榜 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">排行榜</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockPlaylists.slice(0, 6).map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-4 backdrop-blur-xl cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => {
                  setPlaylist(playlist.songs);
                  if (playlist.songs[0]) playSong(playlist.songs[0]);
                }}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full text-xs font-bold">
                    TOP {index + 1}
                  </div>
                </div>
                <h4 className="font-semibold truncate">{playlist.name}</h4>
                <p className="text-white/60 text-sm truncate">{playlist.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 热门歌手 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">热门歌手</h3>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {mockArtists.slice(0, 10).map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 text-center cursor-pointer group"
              >
                <div className="relative w-32 h-32 mb-3">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-full h-12" />
                </div>
                <h4 className="font-semibold">{artist.name}</h4>
                <p className="text-white/60 text-sm">
                  {(artist.followers / 1000000).toFixed(1)}M 粉丝
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 新歌推荐 */}
        <section>
          <h3 className="text-2xl font-bold mb-6">新歌推荐</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockSongs.slice(0, 12).map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => playSong(song)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 shadow-lg">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-900">
                      <Play className="w-7 h-7" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium truncate">{song.title}</h4>
                <p className="text-white/60 text-sm truncate">{song.artist}</p>
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
