export default function RefundPolicy() {
  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>

      <p className="text-sm text-gray-600 mb-3">
        Orders once confirmed are non-cancellable and non-refundable.
      </p>

      <p className="text-sm text-gray-600 mb-3">
        In case of failed or cancelled transactions, the amount will be automatically refunded to the original payment method within 5–7 business days.
      </p>

      <p className="text-sm text-gray-600 mb-3">
        If you face any issues with your order or payment, please contact our support team for assistance.
      </p>

      <p className="text-sm text-gray-600">
        Contact us at: 
        <span className="font-medium"> support@yourdomain.com</span>
      </p>
    </div>
  );
}