import { MessageCircle, Star } from 'lucide-react';
import { Coach } from '../../types';

interface CoachProfileDialogProps {
  coach: Coach;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (coachId: string) => void;
  onRate: (coachId: string, rating: number) => void;
}

export function CoachProfileDialog({ 
  coach, 
  isOpen, 
  onClose,
  onStartChat,
  onRate 
}: CoachProfileDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 z-10"
        >
          ×
        </button>
        
        <img 
          src={coach.image_url} 
          alt={coach.name}
          className="w-full h-80 object-cover"
        />
        
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-200">{coach.name}</h3>
          <p className="text-indigo-400 mt-1">{coach.profession}</p>
          <p className="text-gray-400 mt-4">{coach.bio}</p>
          
          <div className="mt-6 flex justify-center space-x-6">
            <button
              onClick={() => onStartChat(coach.id)}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <MessageCircle size={20} />
              <span>Start Chat</span>
            </button>
            
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onRate(coach.id, rating)}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Star
                    size={24}
                    fill="currentColor"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}