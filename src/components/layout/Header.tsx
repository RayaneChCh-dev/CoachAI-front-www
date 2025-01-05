import { useRef, useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navigation } from './Navigation';
import { AccountMenu } from '../account/AccountMenu';
import { CartBadge } from '../cart/CartBadge';
import { CartDrawer } from '../cart/CartDrawer';

interface HeaderProps {
  onAuthClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onAuthClick, onNavigate, currentPage }: HeaderProps) {
  const { user } = useAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">Coaching Platform</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <CartBadge onClick={() => setIsCartOpen(true)} />
            {user ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-full text-gray-300"
                >
                  <User className="w-6 h-6" />
                </button>
                <AccountMenu
                  isOpen={isAccountMenuOpen}
                  onClose={() => setIsAccountMenuOpen(false)}
                  containerRef={accountMenuRef}
                />
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="text-sm text-gray-300 hover:text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>
        <Navigation currentPage={currentPage} onNavigate={onNavigate} />
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </header>
  );
}