"use client";
import { useState, useEffect } from "react";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const { reset } = useQueryErrorResetBoundary();
  const [goals, setGoals] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState("mountain"); // Set the default environment
  const { user, error: userError, isLoading: isUserLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals");

        if (!res.ok) {
          throw new Error(`Failed to fetch goals: ${res.status}`);
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const fetchChatResponse = async () => {
    if (!query) return null; // Prevent fetching if query is not set
    const response = await axios.post("/api/chat", { topic: query });
    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["chatData", query],
    queryFn: fetchChatResponse,
    enabled: !!query, // Only run the query if `query` is not null
    retry: false, // Disable automatic retry
  });

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setQuery(inputValue); // Trigger the useQuery hook to fetch data
      refetch(); // Manually trigger the fetch
    }
  };

  const handleEnvironmentChange = (env: string) => {
    setSelectedEnvironment(env); // Set the selected environment
  };

  // Handle submission with Enter key
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      handleSubmit();
    }
  };

  // Reset the error state when the input value changes
  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [inputValue, reset, isError]);

  // Redirect to the selected environment with query params when data is successfully fetched
  useEffect(() => {
    if (data && !error) {
      const structuredResponse = data.structuredResponse;

      if (structuredResponse) {
        const saveGoalToDatabase = async () => {
          try {
            const res = await fetch("/api/goals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                topic: structuredResponse.topic,
                subtopics: structuredResponse.subtopics,
                learningPath: structuredResponse.learning_path,
                estimatedTime: structuredResponse.estimated_time_to_master,
                environment: selectedEnvironment,
              }),
            });

            if (!res.ok) {
              throw new Error(`Error saving goal: ${res.status}`);
            }

            const savedGoal = await res.json();
            setGoals((prevGoals) => [...prevGoals, savedGoal]);
          } catch (err) {
            console.error("Failed to save goal to the database:", err);
          }
        };

        saveGoalToDatabase();

        const queryParams = new URLSearchParams({
          topic: structuredResponse.topic,
          subtopics: JSON.stringify(structuredResponse.subtopics),
          learningPath: JSON.stringify(structuredResponse.learning_path),
          estimatedTime: structuredResponse.estimated_time_to_master,
        }).toString();

        router.push(`/${selectedEnvironment}?${queryParams}`);
      }
    }
  }, [data, router, error, selectedEnvironment]);
  return (
    <div className="h-screen flex flex-col pb-6 animated-slideshow">
      <div className="absolute bottom-4 left-4">
        {isUserLoading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Welcome, {user.name || user.email}!</span>
            <a
              href="/api/auth/logout"
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </a>
          </div>
        ) : (
          <a
            href="/api/auth/login"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </a>
        )}
      </div>
      <div className="h-full flex flex-col justify-center">
        <div className="-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="/goalscapes.png"
            style={{ width: "1000px", height: "475px" }}
          />
        </div>

        {/* Search */}
        <div className="-mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-4 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Break down your goal or topic..."
              disabled={isLoading}
            />
            <div className="absolute top-1/2 end-2 -translate-y-1/2">
              <button
                type="button"
                onClick={handleSubmit}
                className={`size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent ${
                  isLoading
                    ? "bg-gray-300 text-gray-500"
                    : "bg-gray-100 text-gray-500 hover:text-gray-800"
                } focus:outline-none disabled:opacity-50 disabled:pointer-events-none`}
                disabled={isLoading || !inputValue}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m16 16-4-4-4 4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Environment Selection Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-6 py-4 rounded-lg ${
              selectedEnvironment === "mountain"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleEnvironmentChange("mountain")}
          >
            Mountain
          </button>
          <button
            className={`px-6 py-4 rounded-lg ${
              selectedEnvironment === "tokyotower"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleEnvironmentChange("tokyotower")}
          >
            Tokyo Tower
          </button>
          <button
            className={`px-6 py-4 rounded-lg ${
              selectedEnvironment === "volcano"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleEnvironmentChange("volcano")}
          >
            Volcano
          </button>
          <button
            className={`px-6 py-4 rounded-lg ${
              selectedEnvironment === "hikingtrail"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleEnvironmentChange("hikingtrail")}
          >
            Hiking Trail
          </button>
        </div>

        {/* Display error message */}
        {isError && error && (
          <div className="mt-6 text-center text-red-500">
            {error.response?.status === 422 ? (
              <p>
                The chat response is not in a valid JSON format. Please try
                again.
              </p>
            ) : (
              <p>
                <strong>Error:</strong>{" "}
                {error.response?.data?.error || error.message}
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .animated-slideshow {
          position: relative;
          overflow: hidden;
        }

        .animated-slideshow::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          animation: slideshow 20s infinite ease-in-out;
          z-index: -1; /* Ensure the background is behind the content */
          background-color: rgba(0, 0, 0, 0.25);
          background-blend-mode: darken; /* Blend the black overlay with the background */
        }

        .animated-slideshow::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          animation: slideshow 25s infinite ease-in-out,
            zoom 20s infinite ease-in-out;
          z-index: -1; /* Ensure the background is behind the content */
          background-color: rgba(0, 0, 0, 0.25); /* Black overlay */
          background-blend-mode: darken; /* Blend the black overlay with the background */
        }

        @keyframes slideshow {
          0% {
            background-image: url("/1.png");
          }
          25% {
            background-image: url("/2.png");
          }
          50% {
            background-image: url("/3.png");
          }
          75% {
            background-image: url("/4.png");
          }
          100% {
            background-image: url("/1.png");
          }
        }

        @keyframes zoom {
          0%,
          100% {
            transform: scale(1); /* Start and end at normal scale */
          }
          50% {
            transform: scale(1.1); /* Zoom in at the midpoint */
          }
        }
      `}</style>
    </div>
  );
}
