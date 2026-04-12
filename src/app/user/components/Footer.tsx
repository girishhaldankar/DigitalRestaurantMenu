import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="text-center text-xs text-gray-300 mt-10 pb-6">
      
      {/* Links */}
      <div className="space-x-4">
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>

        <Link to="/terms" className="hover:underline">
          Terms
        </Link>

        <Link to="/refund-policy" className="hover:underline">
          Refund Policy
        </Link>
      </div>

      {/* Contact Info (IMPORTANT for Razorpay) */}
      <div className="mt-2 text-[10px] text-gray-400">
        Contact: your@email.com | +91 XXXXX XXXXX
      </div>

    </footer>
  );
}