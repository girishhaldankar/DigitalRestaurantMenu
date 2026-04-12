import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerCustomer } from "../services/customerRegister";

export default function CustomerRegister() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 get mobile from login redirect (if any)
  const prefilledMobile = location.state?.mobile;

  useEffect(() => {
    if (prefilledMobile) {
      setMobile(prefilledMobile);
    }
  }, [prefilledMobile]);

  const handleRegister = async () => {
    if (!name || !mobile) {
      alert("Enter name and mobile number");
      return;
    }

    try {
      setLoading(true);

      // 📝 REGISTER CUSTOMER
      const user = await registerCustomer(name, mobile);

      // 💾 SAVE SESSION
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
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/10 p-6 rounded-xl w-80 text-center backdrop-blur-md">

        <h2 className="text-white text-xl mb-4">
          Customer Register
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-transparent border text-white"
        />

        {/* MOBILE */}
        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-transparent border text-white"
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-teal-500 text-white py-2 rounded"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-xs text-gray-300 mt-3">
          New users will be registered in system
        </p>

      </div>
    </div>
  );
}