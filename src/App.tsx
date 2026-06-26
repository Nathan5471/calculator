import { useState } from "react";

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | null
  >(null);
  const [buttonSelectedDifficulty, setButtonSelectedDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("easy");
  const difficultyDescriptions = {
    easy: "Just a normal calculator",
    medium: "Everytime you select a key, all keys will be shuffled",
    hard: "Same as medium, but you can only look at the shuffled keys for 2 before they're hidden",
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-600">
      {!selectedDifficulty && (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-black/15">
          <div className="flex flex-col items-center justify-center w-1/3 h-auto p-4 bg-gray-500 rounded-lg">
            <h2 className="text-2xl font-bold text-white">Select Difficulty</h2>
            <div className="flex flex-row justify-center mt-4 space-x-4">
              {["easy", "medium", "hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-4 py-2 text-white rounded-lg ${
                    buttonSelectedDifficulty === difficulty
                      ? "bg-blue-500 hover:bg-blue-400"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setButtonSelectedDifficulty(
                      difficulty as "easy" | "medium" | "hard",
                    );
                  }}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-white">
              {difficultyDescriptions[buttonSelectedDifficulty]}
            </p>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
              onClick={() => setSelectedDifficulty(buttonSelectedDifficulty)}
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
