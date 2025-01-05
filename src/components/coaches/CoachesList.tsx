import { useState, useEffect } from 'react';
import { CoachCard } from './CoachCard';
import { CoachProfileDialog } from './CoachProfileDialog';
import { ChatDialog } from '../chat/ChatDialog';
import { Coach } from '../../types';
import { endpoints } from '../../config/api';

export function CoachesList() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [chatCoach, setChatCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(endpoints.coaches.getAll);
        if (!response.ok) {
          throw new Error('Failed to fetch coaches');
        }
        const data: Coach[] = await response.json();
        setCoaches(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const handleStartChat = (coachId: string) => {
    const coach = coaches.find((c) => c.id === coachId);
    if (coach) {
      setChatCoach(coach);
      setSelectedCoach(null); // Close the profile dialog
    }
  };

  const handleRate = (coachId: string, rating: number) => {
    console.log('Rating coach:', coachId, 'with rating:', rating);
  };

  if (loading) {
    return <p className="text-gray-400 text-center">Loading coaches...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center">Error: {error}</p>;
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
        Meet Our Expert Coaches
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Learn from industry professionals with years of experience in their respective fields
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coaches.map((coach) => (
          <CoachCard
            key={coach.id}
            coach={coach}
            onViewProfile={setSelectedCoach}
          />
        ))}
      </div>

      <CoachProfileDialog
        coach={selectedCoach!}
        isOpen={!!selectedCoach}
        onClose={() => setSelectedCoach(null)}
        onStartChat={handleStartChat}
        onRate={handleRate}
      />

      {chatCoach && (
        <ChatDialog
          coach={chatCoach}
          isOpen={!!chatCoach}
          onClose={() => setChatCoach(null)}
        />
      )}
    </div>
  );
}
