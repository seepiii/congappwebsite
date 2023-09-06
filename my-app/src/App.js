import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <form className="add">
      <label htmlFor="bottle">Bottle:</label>
      <input type="checkbox" name="bottle" />
      <label htmlFor="filter">Filter:</label>
      <input type="text" name="filter" />
      <label htmlFor="temp">Temp:</label>
      <input type="text" name="temp" />
      <label htmlFor="working">Working:</label>
      <input type="checkbox" name="working" />
    
      <button>add a new water fountain</button>
    </form>
  );
}

export default App;
