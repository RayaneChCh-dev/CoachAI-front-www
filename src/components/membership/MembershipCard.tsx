import { Check } from 'lucide-react';
import { MembershipPlan } from '../../types';

interface MembershipCardProps {
  plan: MembershipPlan;
  isCurrentPlan: boolean | undefined;
  onUpgrade: (planId: string) => void;
}

export function MembershipCard({ plan, isCurrentPlan, onUpgrade }: MembershipCardProps) {
  return (
    <div className={`
      rounded-2xl p-6 
      ${plan.id === 'premium' 
        ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-xl' 
        : 'bg-gray-800'
      }
    `}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
          <p className="text-gray-300 mt-2">{plan.description}</p>
        </div>
        {plan.id === 'premium' && (
          <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-sm font-semibold rounded-full">
            Popular
          </span>
        )}
      </div>

      <div className="mt-6">
        <span className="text-4xl font-bold text-white">${plan.price}</span>
        <span className="text-gray-300 ml-2">/month</span>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onUpgrade(plan.id)}
        disabled={isCurrentPlan}
        className={`
          w-full mt-8 px-4 py-3 rounded-lg font-semibold
          ${isCurrentPlan
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : plan.id === 'premium'
              ? 'bg-white text-indigo-600 hover:bg-gray-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }
        `}
      >
        {isCurrentPlan ? 'Current Plan' : 'Upgrade Now'}
      </button>
    </div>
  );
}