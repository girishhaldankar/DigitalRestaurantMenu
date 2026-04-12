import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative text-white">

      {/* 🔥 Background (same as your app) */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/food-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* 🔥 Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-green-400"
        >
          ← Back
        </button>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4 shadow-xl">

          <h1 className="text-2xl font-bold">Privacy Policy</h1>

          <p className="text-sm text-gray-200">
            We collect basic customer information such as name, phone number, and order details to process your food orders.
          </p>

          <p className="text-sm text-gray-300">
            Payments are securely processed through Razorpay. We do not store your card details, UPI information, or any sensitive payment data on our servers.
          </p>

          <p className="text-sm text-gray-300">
            Your information is used strictly for order processing, delivery, and customer support. We do not sell or share your personal data with third parties.
          </p>

          <p className="text-sm text-gray-300">
            We may use your contact information to communicate order updates and support-related queries.
          </p>

          <p className="text-sm text-gray-300">
            For any questions regarding this policy, please contact us at:
            <span className="font-medium text-white"> support@yourdomain.com</span>
          </p>

        </div>
      </div>
    </div>
  );
}