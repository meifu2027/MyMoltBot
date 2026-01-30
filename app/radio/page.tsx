'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { Play, Bell, Radio, Plus, Speaker } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/common/Toast';

export default function RadioPage() {
  const { playSong } = usePlayerStore();
  const { toasts, showToast, removeToast } = useToast();
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);

  const handleStationClick = (stationName: string) => {
    setCurrentStation(stationName);
    showToast(`正在播放: ${stationName}`, 'success');
  };

  const handlePodcastClick = (podcastTitle: string) => {
    showToast(`打开播客: ${podcastTitle}`, 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-40">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Radio className="w-6 h-6" />
            <span>广播</span>
          </h1>
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
        {/* 热门电台 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">热门电台</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: '华语流行', desc: '最新华语流行音乐', color: 'from-pink-500 to-red-500' },
              { name: '欧美金曲', desc: '经典欧美歌曲', color: 'from-blue-500 to-purple-500' },
              { name: '放松音乐', desc: '舒缓心情的音乐', color: 'from-green-500 to-teal-500' },
              { name: '动感节奏', desc: '充满活力的节奏', color: 'from-orange-500 to-yellow-500' },
              { name: '怀旧经典', desc: '回忆往昔岁月', color: 'from-gray-500 to-gray-700' },
              { name: '电子音乐', desc: '前沿电子音浪', color: 'from-purple-500 to-pink-500' },
              { name: '摇滚之夜', desc: '激情摇滚现场', color: 'from-red-500 to-orange-500' },
              { name: '民谣时光', desc: '温暖民谣旋律', color: 'from-yellow-500 to-orange-500' },
            ].map((station, index) => (
              <motion.div
                key={station.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleStationClick(station.name)}
                className={`bg-gradient-to-br ${station.color} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform shadow-xl relative`}
              >
                {currentStation === station.name && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
                <div className="flex justify-center mb-4">
                  <Speaker className={`w-8 h-8 ${currentStation === station.name ? 'animate-pulse' : ''}`} />
                </div>
                <h4 className="font-bold text-lg mb-2">{station.name}</h4>
                <p className="text-white/80 text-sm">{station.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 播客推荐 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">播客推荐</h3>
            <button
              onClick={() => {
                setShowAllPodcasts(!showAllPodcasts);
                showToast(showAllPodcasts ? '收起播客列表' : '展开全部播客', 'success');
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              {showAllPodcasts ? '收起 ↑' : '查看全部 →'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: '音乐故事', host: 'DJ 小明', episodes: 128, cover: 'https://picsum.photos/seed/podcast1/400/400' },
              { title: '深夜电台', host: 'DJ 小红', episodes: 96, cover: 'https://picsum.photos/seed/podcast2/400/400' },
              { title: '音乐百科', host: 'DJ 小刚', episodes: 64, cover: 'https://picsum.photos/seed/podcast3/400/400' },
              { title: '音乐现场', host: 'DJ 小花', episodes: 48, cover: 'https://picsum.photos/seed/podcast4/400/400' },
            ].map((podcast, index) => (
              <motion.div
                key={podcast.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePodcastClick(podcast.title)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <img
                  src={podcast.cover}
                  alt={podcast.title}
                  className="w-20 h-20 rounded-xl object-cover shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg truncate">{podcast.title}</h4>
                  <p className="text-white/60 text-sm mb-1">{podcast.host}</p>
                  <p className="text-white/40 text-xs">{podcast.episodes} 集节目</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePodcastClick(podcast.title);
                  }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Play className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 个性化推荐 */}
        <section>
          <h3 className="text-2xl font-bold mb-6">为你推荐</h3>
          <div className="space-y-4">
            {[
              { title: '根据你的音乐品味', desc: '基于你最近播放的歌曲', icon: Play },
              { title: '每日精选', desc: '为你精心挑选的歌曲', icon: Plus },
              { title: '新发现', desc: '你可能喜欢的新歌曲', icon: Bell },
              { title: '心情音乐', desc: '根据时间和心情推荐', icon: Speaker },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => showToast(`正在打开: ${item.title}`, 'info')}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-center">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`播放: ${item.title}`, 'success');
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <Play className="w-6 h-6" />
                </button>
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
