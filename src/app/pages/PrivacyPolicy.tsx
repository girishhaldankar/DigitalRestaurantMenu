export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-sm text-gray-600 mb-3">
        We collect basic customer information such as name, phone number, and order details to process your food orders.
      </p>

      <p className="text-sm text-gray-600 mb-3">
        Payments are securely processed through Razorpay. We do not store your card details, UPI information, or any sensitive payment data on our servers.
      </p>

      <p className="text-sm text-gray-600 mb-3">
        Your information is used strictly for order processing, delivery, and customer support. We do not sell or share your personal data with third parties.
      </p>

      <p className="text-sm text-gray-600 mb-3">
        We may use your contact information to communicate order updates and support-related queries.
      </p>

      <p className="text-sm text-gray-600">
        For any questions regarding this policy, please contact us at: 
        <span className="font-medium"> support@yourdomain.com</span>
      </p>
    </div>
  );
}