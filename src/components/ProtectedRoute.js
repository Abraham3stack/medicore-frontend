"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";

export default function ProtectedRoute({ children, role }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (role && user.role !== role) {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router, role]);

  if (loading) return null;

  return children;
}