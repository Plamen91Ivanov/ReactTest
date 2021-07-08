import './App.css';
import Test from './components/test'
import {Components} from 'react'

function App() {
  state = {
    count : 0,
  };

  const expense = [
    {title: 'car', amound: 10,date: new Date(2021, 5, 10)},
    {title: 'car1', amound: 20,date: new Date(2021, 5, 12)},
    {title: 'car2', amound: 30,date: new Date(2021, 5, 11)},
  ];

  return (
    <div className="App">
    <Test title={expense[0].title} amound = {expense[0].amound}/>
    <Test title={expense[1].title}  amound = {expense[1].amound}/>
  <h1>count:{state.count}</h1>
    <button onClick={() => {count++}}>Click ME</button>
    </div>
  );
}

export default App;
