"use client";
import { useState, useEffect } from "react";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const { reset } = useQueryErrorResetBoundary();

  const router = useRouter();

  const fetchChatResponse = async () => {
    if (!query) return null; // Prevent fetching if query is not set
    const response = await axios.post("/api/chat", { topic: query });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
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

  // Redirect to /mountain when data is successfully fetched
  useEffect(() => {
    if (data && !error) {
      router.push("/mountain");
    }
  }, [data, router]);

  return (
    <div className="h-screen flex flex-col pb-6">
      <div className="h-full flex flex-col justify-center">
        <div className="-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Welcome to Preline AI
          </h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Your AI-powered copilot for the web
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown} // Handle Enter key press
              className="p-4 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Ask me anything..."
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
                } focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:bg-neutral-800 dark:hover:text-white dark:focus:text-white`}
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
        {/* End Search */}

        {/* Display the API response, error, or loading state */}
        {/* {data && <div className="mt-6 text-center">Response: {JSON.stringify(data)}</div>} */}
        
        {/* Display error message */}
        {isError && error && (
          <div className="mt-6 text-center text-red-500">
            {error.response?.status === 422 ? (
              <p>The chat response is not in a valid JSON format. Please try again.</p>
            ) : (
              <p>
                <strong>Error:</strong> {error.response?.data?.error || error.message}
              </p>
            )}
          </div>
        )}
      </div>

      <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-600 dark:text-neutral-500">HackRice 2024</p>
      </footer>
    </div>
  );
}
