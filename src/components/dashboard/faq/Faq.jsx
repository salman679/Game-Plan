import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const FAQSection = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const faqData = [
    {
      id: 1,
      question: "What should I type in text box?",
      answer: "Ask me about live sports, team stats, or subscription plans.",
    },
    {
      id: 2,
      question: "What should I type in text box?",
      answer:
        "You can ask about player statistics, match schedules, team formations, or any sports-related queries.",
    },
    {
      id: 3,
      question: "What should I type in text box?",
      answer:
        "Feel free to inquire about premium features, coaching tips, or game analysis tools available in the platform.",
    },
    {
      id: 4,
      question: "What should I type in text box?",
      answer:
        "You can also ask about subscription plans, billing information, or technical support for the application.",
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">FAQ</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                  {expandedItems[item.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {expandedItems[item.id] && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="pt-3 text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
