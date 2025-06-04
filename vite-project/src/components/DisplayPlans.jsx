import { useState } from 'react';

const DisplayPlans = () => {
  const plans = [
    {
      name: "Basic Plan (Free)",
      monthly: "Free",
      annual: "Free",
      services: [
        { name: "All Services", quota: "3 Free Uses per Month" },
      ],
    },
    {
      name: "Developer Plan",
      monthly: "$4.99 / month",
      annual: "$47.90 / year (20% off)",
      services: [
        { name: "All Services", quota: "10 Free Uses per Month" },
      ],
    },
    {
      name: "Business Plan",
      monthly: "$6.99 / month",
      annual: "$67.10 / year (20% off)",
      services: [
        { name: "All Services", quota: "Unlimited Usage" },
      ],
    },
  ];

  return (
    <div id="pricing" className="px-6 py-12 bg-indigo-100 dark:bg-indigo-900">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 dark:text-teal-400 mb-4">
        Subscription Plans
      </h2>
      <p className="text-center text-white dark:text-white mb-10">
        Choose a plan that fits your needs. Upgrade anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => window.location.href = 'http://localhost:5173/plans'}
            className="bg-white dark:bg-[#F4EDE4]  rounded-xl shadow-lg p-8 hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-600 mb-3">
              {plan.name}
            </h3>
            <p className="text-indigo-800 dark:text-indigo-800 mb-2">
              Monthly: <span className="font-medium">{plan.monthly}</span>
            </p>
            <p className="text-indigo-800 dark:text-indigo-800 mb-4">
              Annually: <span className="font-medium">{plan.annual}</span>
            </p>

            <h4 className="text-indigo-800 dark:text-indigo-800 font-semibold mb-2">
              Services:
            </h4>
            <ul className="text-indigo-800 dark:text-indigo-800 list-disc list-inside space-y-1 text-sm">
              {plan.services.map((service, idx) => (
                <li key={idx}>
                  {service.name} — {service.quota}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPlans; 