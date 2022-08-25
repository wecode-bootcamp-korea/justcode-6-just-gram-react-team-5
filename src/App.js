import './App.css';
import { useState } from 'react';

function App() {
	const [color, setColor] = useState('red');
	
	return (
      <div>
        <h1 style={{ color: color }}>Function Component | State</h1>
				<button onClick={() => setColor('green')}>Click</button>
      </div>
  );
}

export default App;