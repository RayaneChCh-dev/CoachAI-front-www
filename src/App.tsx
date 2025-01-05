import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AuthModal } from './components/auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { FitProPage } from './pages/FitProPage';
import { useAuth } from './context/AuthContext';

function AuthenticatedApp() {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
    }
  }, [isAuthenticated]);

  const renderPage = () => {
    if (!isAuthenticated) {
      return (
        <div className="h-[80vh] flex items-center justify-center">
          <p className="text-gray-400 text-lg">Please sign in to access the platform</p>
        </div>
      );
    }

    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'fitpro':
        return <FitProPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
      <Header 
        onAuthClick={() => setIsAuthModalOpen(true)} 
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => isAuthenticated && setIsAuthModalOpen(false)}
        canClose={isAuthenticated}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthenticatedApp />
      </CartProvider>
    </AuthProvider>
  );
}