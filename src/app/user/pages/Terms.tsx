import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative text-white">

      {/* 🔥 Background */}
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

          <h1 className="text-2xl font-bold">Terms & Conditions</h1>

          <p className="text-sm text-gray-200">
            By placing an order through our platform, you agree to comply with these terms and conditions.
          </p>

          <p className="text-sm text-gray-300">
            All menu items are subject to availability. We reserve the right to modify or discontinue items without prior notice.
          </p>

          <p className="text-sm text-gray-300">
            Prices listed on the platform are subject to change without prior notice.
          </p>

          <p className="text-sm text-gray-300">
            Once an order is confirmed, it cannot be modified or cancelled.
          </p>

          <p className="text-sm text-gray-300">
            We are not responsible for delays caused due to unforeseen circumstances beyond our control.
          </p>

          <p className="text-sm text-gray-300">
            For any support or queries, contact us at:
            <span className="font-medium text-white"> support@yourdomain.com</span>
          </p>

        </div>
      </div>
    </div>
  );
}