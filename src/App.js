import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Welcome to Litter.ai</h1>
      <p>With just a click, sort your garbage and save the world</p>
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '200px' }}>
        <button style={{ width: '100%', marginBottom: '10px' }}>Learn More</button>
        <button style={{ width: '100%' }}>Capture Image</button>
      </div>
      </header>
    </div>
  );
}

export default App;
