import { useState } from "react";

function App() {
  const [joke, setJoke] = useState(null);

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }} className="random-joke-container">
      <h1>Random Joke</h1>
      <p>Click the button to fetch a fresh one.</p>
      <button onClick={fetchJoke}>Fetch Joke</button>
      {joke && (
        <div>
          <h3>{joke.setup}</h3>
          <p>{joke.punchline}</p>
        </div>
      )}
      {!joke && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p>Could not fetch joke. Try again.</p>
          <a href="#" onClick={(e) => {
            e.preventDefault();
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
