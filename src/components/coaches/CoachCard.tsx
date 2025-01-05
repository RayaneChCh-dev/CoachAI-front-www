
import { Coach } from '../../types';

interface CoachCardProps {
  coach: Coach;
  onViewProfile: (coach: Coach) => void;
}

export function CoachCard({ coach, onViewProfile }: CoachCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105">
      <img 
        src={coach.image_url} 
        alt={coach.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-200">{coach.name}</h3>
        <p className="text-indigo-400 mt-1">{coach.profession}</p>
        <p className="text-gray-400 mt-3 text-sm">{coach.bio}</p>
        <button 
          onClick={() => onViewProfile(coach)}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}