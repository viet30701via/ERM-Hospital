// src/lib/api.ts
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("access_token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config);

  // Xử lý lỗi tập trung tại đây
  if (response.status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/login?message=expired";
  }

  return response;
};
