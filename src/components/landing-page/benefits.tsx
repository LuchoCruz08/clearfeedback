import { Smile, TrendingUp, Zap, Users, BarChart, Lock } from "lucide-react";

const benefits = [
  {
    icon: Smile,
    title: "Improve User Experience",
    description:
      "Gather insights to enhance your product and delight your users.",
  },
  {
    icon: TrendingUp,
    title: "Boost Conversion Rates",
    description: "Identify and remove friction points in your user journey.",
  },
  {
    icon: Zap,
    title: "Streamline Decision-Making",
    description:
      "Make data-driven decisions with real-time feedback analytics.",
  },
  {
    icon: Users,
    title: "Increase Customer Retention",
    description:
      "Address user concerns proactively to build lasting relationships.",
  },
  {
    icon: BarChart,
    title: "Measure Product-Market Fit",
    description: "Gauge user satisfaction and identify areas for improvement.",
  },
  {
    icon: Lock,
    title: "Build Trust and Credibility",
    description: "Show users you value their input and act on their feedback.",
  },
];

export default function Benefits() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The ClearFeedback Advantage
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover how ClearFeedback can transform your business and user
            relationships
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                  <benefit.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="mt-8 text-xl font-semibold text-gray-900">
                {benefit.title}
              </h3>
              <p className="mt-4 text-base text-gray-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
          >
            Start Reaping the Benefits
          </a>
        </div>
      </div>
    </section>
  );
}
