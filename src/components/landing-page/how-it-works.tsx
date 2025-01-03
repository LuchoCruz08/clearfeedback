import { FolderPlus, Code, MessageSquare, BarChart2 } from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    title: "Create a Project",
    description:
      "Set up your feedback project in minutes with our intuitive dashboard.",
  },
  {
    icon: Code,
    title: "Embed the Script",
    description:
      "Copy and paste our lightweight script into your website or app.",
  },
  {
    icon: MessageSquare,
    title: "Collect Feedback",
    description:
      "Gather valuable insights from your users through customizable widgets.",
  },
  {
    icon: BarChart2,
    title: "Analyze Results",
    description: "Dive into powerful analytics and make data-driven decisions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How ClearFeedback Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get started in four simple steps and transform your customer
            feedback process
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 border-4 border-white">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-[200px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional content or CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-600">
            Ready to revolutionize your feedback process?
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
}
