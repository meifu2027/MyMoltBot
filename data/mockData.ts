// Mock 数据

import { Song, Playlist, Artist, User } from '../lib/types';

// Mock 歌曲数据（50首，中英文混合）
export const mockSongs: Song[] = [
  {
    id: '1',
    title: '告白气球',
    artist: '周杰伦',
    album: '周杰伦的床边故事',
    duration: 200,
    coverUrl: 'https://picsum.photos/seed/song1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: '塞纳河畔 左岸的咖啡\n我手一杯 品尝你的美\n留下唇印的嘴\n\n花店玫瑰 名字写错谁\n告白气球 风吹到对街\n微笑在天上飞\n\n你说你有点难追\n想让我知难而退\n礼物不需挑最贵\n只要香榭的落叶\n营造浪漫的约会\n不害怕搞砸一切\n拥有你就拥有 全世界',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Mojito',
    artist: '周杰伦',
    album: '最伟大的作品',
    duration: 215,
    coverUrl: 'https://picsum.photos/seed/song2/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 234,
    coverUrl: 'https://picsum.photos/seed/song3/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    lyrics: 'The club isn\'t the best place to find a lover\nSo the bar is where I go\nMe and my friends at the table doing shots\nDrinking fast and then we talk slow',
    isFavorite: true
  },
  {
    id: '4',
    title: '晴天',
    artist: '周杰伦',
    album: '叶惠美',
    duration: 269,
    coverUrl: 'https://picsum.photos/seed/song4/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    lyrics: '故事的小黄花\n从出生那年就飘着\n童年的荡秋千\n随记忆一直晃到现在\n\nRe So So Si Do Si La\nSo La Si Si Si Si La Si La So\n吹着前奏 望着天空\n我想起花瓣试着掉落',
    isFavorite: false
  },
  {
    id: '5',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://picsum.photos/seed/song5/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    isFavorite: false
  },
  // 继续添加更多歌曲...
];

// 添加更多歌曲到50首
for (let i = 6; i <= 50; i++) {
  mockSongs.push({
    id: String(i),
    title: `Song ${i}`,
    artist: i % 2 === 0 ? 'Artist A' : 'Artist B',
    album: `Album ${Math.ceil(i / 5)}`,
    duration: 180 + (i * 5) % 120,
    coverUrl: `https://picsum.photos/seed/song${i}/400/400`,
    audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 10) + 1}.mp3`,
    isFavorite: i % 5 === 0
  });
}

// Mock 歌手数据（20-30位）
export const mockArtists: Artist[] = [
  {
    id: 'artist1',
    name: '周杰伦',
    avatarUrl: 'https://picsum.photos/seed/artist1/200/200',
    followers: 50000000,
    bio: '华语流行音乐天王'
  },
  {
    id: 'artist2',
    name: 'Ed Sheeran',
    avatarUrl: 'https://picsum.photos/seed/artist2/200/200',
    followers: 80000000,
    bio: '英国创作歌手'
  },
  {
    id: 'artist3',
    name: 'The Weeknd',
    avatarUrl: 'https://picsum.photos/seed/artist3/200/200',
    followers: 60000000,
    bio: '加拿大流行歌手'
  },
  // 继续添加更多歌手...
];

// 添加更多歌手
for (let i = 4; i <= 30; i++) {
  mockArtists.push({
    id: `artist${i}`,
    name: `Artist ${i}`,
    avatarUrl: `https://picsum.photos/seed/artist${i}/200/200`,
    followers: Math.floor(Math.random() * 100000000),
    bio: `This is artist ${i} bio`
  });
}

// Mock 歌单数据（15-20个）
export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist1',
    name: '今日推荐',
    description: '为你精心挑选的歌曲',
    songs: mockSongs.slice(0, 10),
    coverUrl: 'https://picsum.photos/seed/playlist1/400/400',
    isFavorite: true
  },
  {
    id: 'playlist2',
    name: '华语流行',
    description: '最新华语流行歌曲',
    songs: mockSongs.filter(s => s.title.includes('Song') || s.artist === '周杰伦'),
    coverUrl: 'https://picsum.photos/seed/playlist2/400/400',
    isFavorite: false
  },
  {
    id: 'playlist3',
    name: '英文金曲',
    description: '经典英文歌曲',
    songs: mockSongs.filter(s => ['Ed Sheeran', 'The Weeknd'].includes(s.artist)),
    coverUrl: 'https://picsum.photos/seed/playlist3/400/400',
    isFavorite: false
  },
  {
    id: 'playlist4',
    name: '深夜听歌',
    description: '适合深夜聆听的音乐',
    songs: mockSongs.slice(20, 30),
    coverUrl: 'https://picsum.photos/seed/playlist4/400/400',
    isFavorite: false
  },
  {
    id: 'playlist5',
    name: '运动健身',
    description: '动感十足的音乐',
    songs: mockSongs.slice(30, 40),
    coverUrl: 'https://picsum.photos/seed/playlist5/400/400',
    isFavorite: true
  },
  // 继续添加更多歌单...
];

// 添加更多歌单
for (let i = 6; i <= 15; i++) {
  mockPlaylists.push({
    id: `playlist${i}`,
    name: `播放列表 ${i}`,
    description: `这是播放列表 ${i} 的描述`,
    songs: mockSongs.slice((i * 3) % 40, ((i * 3) + 10) % 50),
    coverUrl: `https://picsum.photos/seed/playlist${i}/400/400`,
    isFavorite: i % 3 === 0
  });
}

// Mock 用户数据
export const mockUser: User = {
  id: 'user1',
  name: '音乐爱好者',
  avatarUrl: 'https://picsum.photos/seed/user1/200/200',
  favoriteSongs: ['1', '3', '5'],
  recentPlayeds: ['1', '2', '3', '4', '5'],
  playlists: mockPlaylists.slice(0, 3)
};

export { Song, Playlist, Artist, User };
