"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";

export default function ProtectedRoute({ children, role }) {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (role && user.role !== role) {
      router.push("/");
    }
  }, [router, role]);
  return children;
}