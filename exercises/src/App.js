import './App.css';
import Test from './components/test'

function App() {

  const expense = [
    {title: 'car', amound: 10,date: new Date(2021, 5, 10)},
    {title: 'car1', amound: 20,date: new Date(2021, 5, 12)},
    {title: 'car2', amound: 30,date: new Date(2021, 5, 11)},
  ];

  return (
    <div className="App">
    <Test title={expense[0].title} amound = {expense[0].amound}/>
    <Test title={expense[1].title}  amound = {expense[1].amound}/>
    </div>
  );
}

export default App;
