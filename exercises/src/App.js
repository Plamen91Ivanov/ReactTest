import './App.css';
import Test from './components/test'

function App() {

  const expense = [
    {title: 'car', amound: 10},
    {title: 'car1', amound: 20},
    {title: 'car2', amound: 30},
  ];

  return (
    <div className="App">
    <Test title={expense[0].title}/>
    <Test title={expense[1].title}/>
    </div>
  );
}

export default App;
