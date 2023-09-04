import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <button
          data-testid="minus-button"
          disabled={disabled}
          onClick={() => setCounter((counter) => counter - 1)}
        >
          -
        </button>
        <button
          data-testid="plus-button"
          disabled={disabled}
          onClick={() => setCounter((counter) => counter + 1)}
        >
          +
        </button>
        <button
          data-testid="on/off-button"
          style={{ backgroundColor: "blue" }}
          onClick={() => {
            setDisabled((prev) => !prev);
            console.log(disabled, "여부");
          }}
        >
          on/off
        </button>
      </header>
    </div>
  );
}

export default App;
