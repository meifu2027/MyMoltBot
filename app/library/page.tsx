'use client';

import { useState } from 'react';
import { mockPlaylists, mockSongs } from '../../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Play, Bell, Plus, Heart } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/Toast';

export default function LibraryPage() {
  const { playSong, setPlaylist, currentSong, toggleFavorite } = usePlayerStore();
  const { toasts, showToast, removeToast } = useToast();
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);

  const handleCategoryClick = (category: string) => {
    showToast(`打开${category}`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-40">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">资料库</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast('创建新播放列表功能开发中...', 'info')}
              className="text-white/60 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
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
        {/* 资料库分类 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Heart />, label: '已喜欢的歌曲', count: 24 },
            { icon: <Play />, label: '专辑', count: 12 },
            { icon: <Plus />, label: '播放列表', count: 15 },
            { icon: <Bell />, label: '歌手', count: 30 },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCategoryClick(item.label)}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-1">{item.label}</h3>
              <p className="text-white/60 text-sm">{item.count} 个</p>
            </motion.div>
          ))}
        </div>

        {/* 我的播放列表 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">我的播放列表</h3>
            <button
              onClick={() => {
                setShowAllPlaylists(!showAllPlaylists);
                showToast(showAllPlaylists ? '收起播放列表' : '展开全部播放列表', 'success');
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {showAllPlaylists ? '收起 ↑' : '查看全部 →'}
            </button>
          </div>

          <div className="space-y-3">
            {(showAllPlaylists ? mockPlaylists : mockPlaylists.slice(0, 5)).map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => {
                  setPlaylist(playlist.songs);
                  if (playlist.songs[0]) playSong(playlist.songs[0]);
                }}
              >
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-16 h-16 rounded-xl object-cover shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{playlist.name}</h4>
                  <p className="text-white/60 text-sm truncate">
                    {playlist.songs.length} 首歌曲
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`已收藏播放列表: ${playlist.name}`, 'success');
                  }}
                  className="text-white/60 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`添加到队列: ${playlist.name}`, 'info');
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 最近播放 */}
        <section>
          <h3 className="text-2xl font-bold mb-6">最近播放</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockSongs.slice(0, 6).map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-900">
                      <Play className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium truncate text-sm">{song.title}</h4>
                <p className="text-white/60 text-xs truncate">{song.artist}</p>
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
