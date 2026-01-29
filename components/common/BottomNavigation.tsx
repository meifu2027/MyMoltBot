'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: '现在就听', path: '/home', icon: '🎵' },
    { label: '浏览', path: '/browse', icon: '🌟' },
    { label: '广播', path: '/radio', icon: '📻' },
    { label: '资料库', path: '/library', icon: '📚' },
    { label: '搜索', path: '/search', icon: '🔍' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 z-40 safe-area-bottom">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                className="flex flex-col items-center justify-center flex-1 h-full relative group"
              >
                <span className={`text-2xl mb-1 transition-all ${isActive ? 'scale-110' : 'opacity-60 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span
                  className={`text-xs font-medium transition-all ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
