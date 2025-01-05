import React from 'react';
import { User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function AccountMenu({isOpen}: AccountMenuProps) {
  const { user, logout } = useAuth();
  
  if (!isOpen || !user) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <User className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-200">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="px-4 py-2 border-b border-gray-700">
        <div className="flex items-center">
          <Crown className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-300">
            {user.hasPaidMembership ? 'Premium Member' : 'Free Plan'}
          </span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );
}