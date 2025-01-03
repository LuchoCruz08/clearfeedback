"use client";

import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const features = [
  'Unlimited Projects',
  'Unlimited Responses',
  'Embeddable Widget (Script)',
  'Response Analysis',
  'CSV Export',
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: isAnnual ? 'Annual Plan' : 'Monthly Plan',
      price: isAnnual ? '$96' : '$10',
      duration: isAnnual ? 'per year' : 'per month',
      description: isAnnual 
        ? 'Save 20% with annual billing'
        : 'Flexible month-to-month billing',
      features: [
        ...features,
        isAnnual ? 'Priority Support' : 'Standard Support',
      ],
    },
  ];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start with a 7-day free trial, no credit card required
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center space-x-4">
          <span className={`text-lg ${!isAnnual ? 'font-semibold text-purple-600' : 'text-gray-600'}`}>Monthly</span>
          <div className="relative">
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="bg-purple-300 data-[state=checked]:bg-purple-600"
            />
          </div>
          <span className={`text-lg ${isAnnual ? 'font-semibold text-purple-600' : 'text-gray-600'}`}>Annual</span>
        </div>

        <div className="mt-12">
          {plans.map((plan, index) => (
            <Card key={index} className="w-full max-w-md mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-purple-600">{plan.name}</CardTitle>
                <CardDescription className="text-center text-lg">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-xl text-gray-500 ml-2">{plan.duration}</span>
                  {!isAnnual && (
                    <p className="mt-2 text-sm text-gray-600">Monthly plan total: $120/year</p>
                  )}
                  {isAnnual && (
                    <p className="mt-2 text-sm text-gray-600">Equivalent to $8/month</p>
                  )}
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
                      <span className="ml-3 text-lg text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="text-white w-full text-lg py-6 bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                  Start Your Free Trial
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            7-day free trial, no credit card required. Cancel anytime.
          </p>
          {isAnnual && (
            <p className="mt-4 text-lg text-purple-600 font-semibold">
              Save 20% with annual billing
            </p>
          )}
          <p className="mt-4 text-lg text-gray-600">
            Need a custom plan? <a href="#" className="text-purple-600 hover:underline">Contact us</a> for enterprise pricing.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-200 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-200 rounded-full opacity-50 blur-3xl"></div>
    </section>
  );
}

