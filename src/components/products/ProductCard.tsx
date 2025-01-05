import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500); // Reset after 1.5s
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-gray-400 mt-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-white">${product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdded}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isAdded
                ? 'bg-green-600 text-white'
                : product.stock === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={20} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={20} />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}