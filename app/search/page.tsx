'use client';

import { useState } from 'react';
import { mockSongs, mockPlaylists, mockArtists } from '../../data/mockData';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import {
  Play,
  Bell,
  Search,
  Heart,
  Plus,
  ArrowLeft,
} from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { playSong, setPlaylist } = usePlayerStore();

  const filteredSongs = searchQuery
    ? mockSongs.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSongs.slice(0, 10);

  const filteredPlaylists = searchQuery
    ? mockPlaylists.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockPlaylists.slice(0, 5);

  const filteredArtists = searchQuery
    ? mockArtists.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockArtists.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-900 text-white">
      {/* 顶部栏 */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 z-40">
        <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
          <button className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索歌曲、歌手、专辑、歌单..."
              className="w-full bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 pl-12 outline-none text-lg placeholder-white/40"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="pt-24 pb-24 px-4 max-w-7xl mx-auto">
        {!searchQuery ? (
          <>
            {/* 热门搜索 */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6">热门搜索</h3>
              <div className="flex flex-wrap gap-3">
                {['周杰伦', 'Ed Sheeran', 'The Weeknd', '告白气球', '晴天', 'Shape of You', 'Blinding Lights'].map((tag, index) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSearchQuery(tag)}
                    className="bg-white/10 backdrop-blur-xl rounded-full px-6 py-2 hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </section>

            {/* 浏览分类 */}
            <section>
              <h3 className="text-2xl font-bold mb-6">浏览分类</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: '华语流行', color: 'from-pink-500 to-red-500' },
                  { name: '欧美金曲', color: 'from-blue-500 to-purple-500' },
                  { name: '日语歌曲', color: 'from-green-500 to-teal-500' },
                  { name: '韩流音乐', color: 'from-purple-500 to-pink-500' },
                  { name: '电子音乐', color: 'from-orange-500 to-yellow-500' },
                  { name: '古典音乐', color: 'from-gray-500 to-gray-700' },
                  { name: '民谣', color: 'from-yellow-500 to-orange-500' },
                  { name: '摇滚', color: 'from-red-500 to-pink-500' },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-transform shadow-xl`}
                  >
                    <h4 className="font-bold text-lg">{category.name}</h4>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* 搜索结果 - 歌曲 */}
            {filteredSongs.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6">歌曲 ({filteredSongs.length})</h3>
                <div className="space-y-2">
                  {filteredSongs.slice(0, 10).map((song, index) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
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
                      <button className="text-white/60 hover:text-white transition-colors">
                        <Heart className="w-6 h-6" />
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <Plus className="w-6 h-6" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* 搜索结果 - 歌单 */}
            {filteredPlaylists.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6">播放列表 ({filteredPlaylists.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredPlaylists.slice(0, 6).map((playlist, index) => (
                    <motion.div
                      key={playlist.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => {
                        setPlaylist(playlist.songs);
                        if (playlist.songs[0]) playSong(playlist.songs[0]);
                      }}
                    >
                      <img
                        src={playlist.coverUrl}
                        alt={playlist.name}
                        className="w-full aspect-square rounded-xl object-cover mb-3"
                      />
                      <h4 className="font-semibold truncate">{playlist.name}</h4>
                      <p className="text-white/60 text-sm truncate">{playlist.description}</p>
                      <p className="text-white/40 text-xs mt-1">{playlist.songs.length} 首歌曲</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* 搜索结果 - 歌手 */}
            {filteredArtists.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6">歌手 ({filteredArtists.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredArtists.slice(0, 8).map((artist, index) => (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 text-center cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={artist.avatarUrl}
                        alt={artist.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                      />
                      <h4 className="font-semibold">{artist.name}</h4>
                      <p className="text-white/60 text-sm">
                        {(artist.followers / 1000000).toFixed(1)}M 粉丝
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* 无搜索结果 */}
            {filteredSongs.length === 0 && filteredPlaylists.length === 0 && filteredArtists.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">
                  <Search className="w-20 h-20 mx-auto text-white/60" />
                </div>
                <p className="text-white/60 text-xl">没有找到相关结果</p>
                <p className="text-white/40 text-sm mt-2">试试其他关键词</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
