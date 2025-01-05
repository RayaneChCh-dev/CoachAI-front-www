import { MembershipPlans } from '../components/membership/MembershipPlans';

export function FitProPage() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
        Choose Your Membership Plan
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Unlock premium features and get access to exclusive coaching content
      </p>
      <MembershipPlans />
    </div>
  );
}