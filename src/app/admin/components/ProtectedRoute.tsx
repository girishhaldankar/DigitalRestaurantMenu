import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ⏳ loading state
  if (user === undefined) {
    return <div className="text-center mt-20">Checking auth...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ✅ logged in
  return children;
}