import { MembershipCard } from './MembershipCard';
import { membershipPlans } from '../../data/membershipPlans';
import { useAuth } from '../../context/AuthContext';

export function MembershipPlans() {
  const { user } = useAuth();

  const handleUpgrade = (planId: string) => {
    // TODO: Implement upgrade functionality
    console.log('Upgrading to plan:', planId);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {membershipPlans.map((plan) => (
        <MembershipCard
          key={plan.id}
          plan={plan}
          isCurrentPlan={
            plan.id === 'free' 
              ? !user?.hasPaidMembership 
              : user?.hasPaidMembership
          }
          onUpgrade={handleUpgrade}
        />
      ))}
    </div>
  );
}