// 播放器状态管理

import { create } from 'zustand';
import { PlayerState, Song, PlayMode } from '../lib/types';
import { mockSongs } from '../data/mockData';

interface PlayerStore extends PlayerState {
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (progress: number) => void;
  setVolume: (volume: number) => void;
  setPlayMode: (mode: PlayMode) => void;
  toggleFavorite: (songId: string) => void;
  toggleLyrics: () => void;
  minimizePlayer: () => void;
  maximizePlayer: () => void;
  setPlaylist: (songs: Song[]) => void;
  addToPlaylist: (song: Song) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  playlist: mockSongs,
  currentIndex: 0,
  isPlaying: false,
  progress: 0,
  volume: 0.8,
  playMode: 'loop',
  isLyricsVisible: false,
  isMinimized: false,

  playSong: (song) => set({
    currentSong: song,
    isPlaying: true,
    progress: 0,
    currentIndex: get().playlist.findIndex(s => s.id === song.id)
  }),

  togglePlay: () => set((state) => ({
    isPlaying: !state.isPlaying
  })),

  pause: () => set({
    isPlaying: false
  }),

  next: () => set((state) => {
    let nextIndex;
    if (state.playMode === 'shuffle') {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (state.currentIndex + 1) % state.playlist.length;
    }

    return {
      currentIndex: nextIndex,
      currentSong: state.playlist[nextIndex],
      progress: 0
    };
  }),

  prev: () => set((state) => {
    const prevIndex = state.currentIndex === 0
      ? state.playlist.length - 1
      : state.currentIndex - 1;

    return {
      currentIndex: prevIndex,
      currentSong: state.playlist[prevIndex],
      progress: 0
    };
  }),

  seek: (progress) => set({
    progress
  }),

  setVolume: (volume) => set({
    volume
  }),

  setPlayMode: (playMode) => set({
    playMode
  }),

  toggleFavorite: (songId) => set((state) => {
    const updatedPlaylist = state.playlist.map(song =>
      song.id === songId
        ? { ...song, isFavorite: !song.isFavorite }
        : song
    );

    const updatedCurrentSong = state.currentSong
      ? { ...state.currentSong, isFavorite: !state.currentSong.isFavorite }
      : null;

    return {
      playlist: updatedPlaylist,
      currentSong: updatedCurrentSong
    };
  }),

  toggleLyrics: () => set((state) => ({
    isLyricsVisible: !state.isLyricsVisible
  })),

  minimizePlayer: () => set({
    isMinimized: true
  }),

  maximizePlayer: () => set({
    isMinimized: false
  }),

  setPlaylist: (songs) => set({
    playlist: songs,
    currentIndex: 0
  }),

  addToPlaylist: (song) => set((state) => ({
    playlist: [...state.playlist, song]
  }))
}));
