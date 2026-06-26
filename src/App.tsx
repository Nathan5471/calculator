import { useState, useEffect } from "react";

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
  const [calculatorText, setCalculatorText] = useState("");
  const [showKeys, setShowKeys] = useState(true);
  const keys = [
    "ac",
    "^",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "<-",
    "=",
  ];
  const [shuffledKeys, setShuffledKeys] = useState<string[]>(keys);

  useEffect(() => {
    if (showKeys && selectedDifficulty === "hard") {
      const timer = setTimeout(() => {
        setShowKeys(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showKeys, selectedDifficulty]);

  const updateDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    setShuffledKeys(keys);
    setShowKeys(true);
    setCalculatorText("");
    setSelectedDifficulty(difficulty);
    setButtonSelectedDifficulty("easy"); // Incase someone goes to change difficulty again
  };

  const solveExpression = (expression: string): number => {
    try {
      const output = eval(expression.replace("^", "**"));
      return output;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      throw new Error("Invalid expression");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-600">
      {!selectedDifficulty && (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-black/35 inset-0 absolute">
          <div className="flex flex-col items-center justify-center w-1/3 h-auto p-4 bg-gray-600 rounded-lg">
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
                    updateDifficulty(difficulty as "easy" | "medium" | "hard");
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
      <div className="flex flex-row items-center justify-between w-full p-4 h-[calc(60px)] bg-gray-700">
        <h1 className="text-2xl font-bold text-white">
          {selectedDifficulty &&
            selectedDifficulty?.charAt(0).toUpperCase() +
              selectedDifficulty?.slice(1)}{" "}
          Calculator
        </h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
          onClick={() => setSelectedDifficulty(null)}
        >
          Change Difficulty
        </button>
      </div>
      <div className="flex items-center justify-center w-screen h-[calc(100vh-60px)] bg-gray-600">
        <div className="flex flex-col justify-center w-1/4 h-auto p-4 bg-gray-500 rounded-lg">
          <div className="flex items-center w-full h-16 p-2 mb-4 bg-gray-400">
            <p className="text-4xl font-bold text-white">{calculatorText}</p>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {shuffledKeys.map((key) => {
              return (
                <button
                  key={key}
                  className={`w-16 h-16 text-2xl font-bold text-white ${!isNaN(parseFloat(key)) ? "bg-gray-400 hover:bg-gray-300" : "bg-orange-400 hover:bg-orange-300"} rounded-full`}
                  onClick={() => {
                    if (calculatorText === "Error") {
                      setCalculatorText("");
                    }
                    if (key === "ac") {
                      setCalculatorText("");
                    } else if (key === "<-") {
                      setCalculatorText((prev) => prev.slice(0, -1));
                    } else if (key === "=") {
                      try {
                        const result = solveExpression(calculatorText);
                        setCalculatorText(result.toString());
                      } catch (error) {
                        setCalculatorText("Error");
                      }
                    } else {
                      setCalculatorText((prev) => prev + key);
                    }
                    if (
                      selectedDifficulty === "medium" ||
                      selectedDifficulty === "hard"
                    ) {
                      const shuffled = [...shuffledKeys].sort(
                        () => Math.random() - 0.5,
                      );
                      setShuffledKeys(shuffled);
                    }
                    if (selectedDifficulty === "hard") {
                      // Shows the keys to kick off the useEffect that will hide them
                      setShowKeys(true);
                    }
                  }}
                >
                  {showKeys ? key : "?"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
