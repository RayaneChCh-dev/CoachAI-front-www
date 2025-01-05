import React from 'react';
import { Home, ShoppingBag, Dumbbell } from 'lucide-react';

interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  id: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', icon: <Home size={20} />, id: 'home' },
  { name: 'Shop', icon: <ShoppingBag size={20} />, id: 'shop' },
  { name: 'FitPro', icon: <Dumbbell size={20} />, id: 'fitpro' },
];

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center px-3 py-3 text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'text-white bg-gray-700'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              } rounded-md`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}