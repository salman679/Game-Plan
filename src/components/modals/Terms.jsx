import { X } from "lucide-react";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Terms & Condition
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 transition-colors duration-300 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-4 leading-relaxed text-gray-700">
            <p>
              Welcome. By using our services, you agree to abide by the terms
              and conditions outlined below. These terms govern your access to
              and use of tools and services, so please review them carefully
              before proceeding.
            </p>

            <p>
              provides innovative tools designed to enhance how you capture and
              manage voice recordings. Our services include voice-to-text
              transcription and AI-driven summarization, which are intended for
              lawful, ethical purposes only. You must ensure compliance with
              applicable laws, including obtaining consent from all participants
              when recording conversations. CleverTalk disclaims liability for
              any misuse of its tools.
            </p>

            <div className="mt-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                1. Acceptance of Terms
              </h3>
              <p className="mb-4">
                By accessing and using our services, you acknowledge that you
                have read, understood, and agree to be bound by these terms and
                conditions.
              </p>

              <h3 className="mb-3 font-semibold text-gray-900">
                2. Service Description
              </h3>
              <p className="mb-4">
                Our platform provides AI-powered sports analysis, team
                statistics, and personalized recommendations for sports
                enthusiasts and professionals.
              </p>

              <h3 className="mb-3 font-semibold text-gray-900">
                3. User Responsibilities
              </h3>
              <p className="mb-4">
                Users are responsible for maintaining the confidentiality of
                their account information and for all activities that occur
                under their account.
              </p>

              <h3 className="mb-3 font-semibold text-gray-900">
                4. Privacy Policy
              </h3>
              <p className="mb-4">
                We are committed to protecting your privacy. Please review our
                Privacy Policy to understand how we collect, use, and protect
                your information.
              </p>

              <h3 className="mb-3 font-semibold text-gray-900">
                5. Limitation of Liability
              </h3>
              <p>
                Our liability is limited to the maximum extent permitted by law.
                We are not responsible for any indirect, incidental, or
                consequential damages arising from your use of our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
