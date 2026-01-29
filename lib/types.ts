// 数据类型定义

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  lyrics?: string;
  translation?: string;
  isFavorite: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  coverUrl: string;
  isFavorite: boolean;
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  followers: number;
  bio: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  favoriteSongs: string[];
  recentPlayeds: string[];
  playlists: Playlist[];
}

export type PlayMode = 'loop' | 'loop-one' | 'shuffle';

export interface PlayerState {
  currentSong: Song | null;
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  volume: number;
  playMode: PlayMode;
  isLyricsVisible: boolean;
  isMinimized: boolean;
}
