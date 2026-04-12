import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/customerLogin";

export default function CustomerLogin() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!mobile) {
      alert("Enter mobile number");
      return;
    }

    // 🔥 validation added
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      // 🔐 STRICT LOGIN
      const user = await loginCustomer(mobile);

      // 💾 SESSION SAVE
      const sessionUser = {
        type: "customer",
        name: user.name,
        mobile: user.mobile,
      };

      localStorage.setItem("currentUser", JSON.stringify(sessionUser));

      // 🍽️ GO TO MENU
      navigate("/");

    } catch (err: any) {
      console.error(err);

      if (err.message === "User not found. Please register first.") {
        // 🔥 redirect to register with mobile prefilled
        navigate("/customer-register", {
          state: { mobile }
        });
      } else {
        alert(err.message || "Login failed");
      }

    } finally {
      // 🔥 ALWAYS RESET LOADING
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/10 p-6 rounded-xl w-80 text-center backdrop-blur-md">

        <h2 className="text-white text-xl mb-4">
          Customer Login
        </h2>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-transparent border text-white"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-teal-500 text-white py-2 rounded"
        >
          {loading ? "Checking..." : "Login"}
        </button>

        <p className="text-xs text-gray-300 mt-3">
          Only registered customers can login
        </p>

      </div>
    </div>
  );
}