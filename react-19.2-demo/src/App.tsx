import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Custom hook to demonstrate a similar pattern to useEffectEvent
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

// Example fetch function
const fetchData = async (url: string) => {
  const controller = new AbortController();
  const response = await fetch(url, { signal: controller.signal });
  return response.json();
};

function App() {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useDocumentTitle(`Count: ${count}`);

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>React 19.2 Demo</h1>
      </header>

      <div className="card">
        <h2>useEffectEvent Example</h2>
        <p>Check the page title - it updates with the count using useEffectEvent</p>
        <button onClick={() => setCount(c => c + 1)}>
          Count: {count}
        </button>
      </div>

      <div className="card">
        <h2>Activity Component</h2>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        
        {showDetails && (
          <div className="details">
            <h3>This content is conditionally rendered</h3>
            <p>This content is only shown when the button is toggled.</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>cacheSignal Example</h2>
        <button onClick={handleFetchData} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Data'}
        </button>
        
        {data && (
          <div className="data-display">
            <h3>Fetched Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
