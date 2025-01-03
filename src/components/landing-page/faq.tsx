/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "How easy is it to integrate ClearFeedback with my website?",
    answer:
      "Integrating ClearFeedback is incredibly simple. Once you've created a project, you'll receive a unique embed script. Just copy and paste this script into your website's HTML, and you're all set. The widget will automatically appear on your site, ready to collect feedback.",
  },
  {
    question: "Can I customize the appearance of the feedback widget?",
    answer:
      "ClearFeedback offers extensive customization options. You can adjust colors, fonts, and sizes to match your brand. You can also choose from various widget types (e.g., ratings, multiple-choice, open-ended) to suit your specific needs.",
  },
  {
    question: "What happens after my 7-day free trial ends?",
    answer:
      "After your free trial, you can choose to subscribe to either our monthly ($10/month) or annual ($96/year) plan. If you decide not to subscribe, your account will be limited, but you won't lose any data. You can upgrade at any time to regain full access.",
  },
  {
    question: "Is my data secure with ClearFeedback?",
    answer:
      "We take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security measures and regularly perform security audits. Your data is yours – we never sell or share it with third parties.",
  },
  {
    question: "Can I export my feedback data?",
    answer:
      "Yes, you can easily export your feedback data in CSV format. This allows you to perform additional analysis or integrate the data with other tools you might be using.",
  },
  {
    question: "Do you offer support if I have issues or questions?",
    answer:
      "We offer email support for all plans. Our annual plan subscribers also get priority support. Our team is committed to helping you make the most of ClearFeedback.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Can't find the answer you're looking for? Reach out to our{" "}
            <a href="#" className="text-purple-600 hover:underline">
              customer support team
            </a>
            .
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <CardTitle>
                  <button
                    className="flex justify-between items-center w-full text-left px-6 py-4 text-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-600" />
                    )}
                  </button>
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
