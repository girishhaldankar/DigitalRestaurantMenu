import { useNavigate } from "react-router-dom";

export default function RefundPolicy() {
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

          <h1 className="text-2xl font-bold">Refund Policy</h1>

          <p className="text-sm text-gray-200">
            Orders once confirmed are non-cancellable and non-refundable.
          </p>

          <p className="text-sm text-gray-300">
            In case of failed or cancelled transactions, the amount will be automatically refunded to the original payment method within 5–7 business days.
          </p>

          <p className="text-sm text-gray-300">
            If you face any issues with your order or payment, please contact our support team for assistance.
          </p>

          <p className="text-sm text-gray-300">
            Contact us at:
            <span className="font-medium text-white"> support@yourdomain.com</span>
          </p>

        </div>
      </div>
    </div>
  );
}