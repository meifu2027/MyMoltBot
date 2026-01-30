'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Play,
  Globe,
  Radio,
  Library,
  Search,
} from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: '现在就听', path: '/home', icon: Play },
    { label: '浏览', path: '/browse', icon: Globe },
    { label: '广播', path: '/radio', icon: Radio },
    { label: '资料库', path: '/library', icon: Library },
    { label: '搜索', path: '/search', icon: Search },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 safe-area-bottom" style={{ zIndex: 60 }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex flex-col items-center justify-center flex-1 h-full relative group cursor-pointer"
              >
                <IconComponent
                  className={`w-6 h-6 mb-1 transition-all ${isActive ? 'text-blue-500' : 'text-white/60 group-hover:text-white/80'}`}
                  strokeWidth={2.5}
                />
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
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
