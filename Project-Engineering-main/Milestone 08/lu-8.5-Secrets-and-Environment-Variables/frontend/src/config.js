// frontend/src/config.js
// Frontend API configuration

// ============================================================
// FIX:
// Use environment variables instead of hardcoded localhost.
// Vite exposes env vars using import.meta.env
//
// Example in .env:
// VITE_API_URL=https://your-backend.onrender.com/api
// ============================================================

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper for making API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Attach auth token if available
  const token = localStorage.getItem("token");

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));

    throw new Error(error.error || "Something went wrong");
  }

  return response.json();
};