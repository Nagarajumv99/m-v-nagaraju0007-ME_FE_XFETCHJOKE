import { useState } from "react";

function App() {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!response.ok) {
        throw new Error("Unable to fetch joke");
      }

      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setError("Could not fetch a joke. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }} className="random-joke-container">
      <h1>Random Joke</h1>
      <p>Click the button to fetch a fresh one.</p>
      <button onClick={fetchJoke} disabled={isLoading}>
        {isLoading ? "Fetching..." : "Fetch joke"}
      </button>
      {joke && (
        <div>
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p>{error}</p>
          <a href="#" onClick={(event) => {
            event.preventDefault();
            fetchJoke();
          }}>
            Try again
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
