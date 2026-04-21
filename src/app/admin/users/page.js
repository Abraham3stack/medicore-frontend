"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-4 md:p-8 bg-background min-h-screen text-textPrimary">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        {loading ? (
          <p className="text-textSecondary">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-textSecondary">No users found</p>
        ) : (
          <div className="bg-surface rounded-xl shadow-md p-3 flex flex-col gap-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-3 rounded-lg bg-white text-black shadow-sm flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs">{user.email}</p>
                </div>

                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateUserRole(user._id, e.target.value)
                    }
                    disabled={updatingId === user._id}
                    className="px-3 py-1 rounded-full text-xs border focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>

                  {updatingId === user._id && (
                    <span className="text-xs text-gray-400">
                      Updating...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}