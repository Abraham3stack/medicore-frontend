"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [toast, setToast] = useState(null);

  const roleStyles = {
    patient: "bg-green-100 text-green-700",
    doctor: "bg-blue-100 text-blue-700",
    admin: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest(".dropdown-container")) return;
      setOpenDropdownId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
      setToast("Role updated successfully");
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-4 md:p-8 bg-background min-h-screen text-textPrimary">
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            {toast}
          </div>
        )}
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        {loading ? (
          <p className="text-textSecondary">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-textSecondary">No users found</p>
        ) : (
          <div className="bg-surface rounded-xl shadow-md p-3 flex flex-col gap-3 overflow-visible">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-3 rounded-lg bg-white text-black shadow-sm flex flex-col md:flex-row md:justify-between md:items-center overflow-visible relative"
              >
                <div>
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs">{user.email}</p>
                </div>

                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <div className="relative dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(
                          openDropdownId === user._id ? null : user._id
                        );
                      }}
                      disabled={updatingId === user._id}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                        updatingId === user._id
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : `${roleStyles[user.role]} hover:scale-105 shadow-sm hover:shadow-md cursor-pointer`
                      }`}
                    >
                      <span>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                      <FaChevronDown className="text-xs opacity-70" />
                    </button>

                    {openDropdownId === user._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border z-50 transform transition-all duration-200 ease-out opacity-100 translate-y-0"
                      >
                        {["patient", "doctor", "admin"].map((role) => (
                          <div
                            key={role}
                            onClick={() => {
                              updateUserRole(user._id, role);
                              setOpenDropdownId(null);
                            }}
                            className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${roleStyles[role]}`}
                          >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {updatingId === user._id && (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
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