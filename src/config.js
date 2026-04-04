/** API origin for lead forms. Set `VITE_API_URL` when the backend is deployed (see `.env.example`). */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
