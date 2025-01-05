import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartBadgeProps {
  onClick: () => void;
}

export function CartBadge({ onClick }: CartBadgeProps) {
  const { totalItems } = useCart();

  return (
    <button 
      onClick={onClick}
      className="p-2 hover:bg-gray-700 rounded-full text-gray-300 relative"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}