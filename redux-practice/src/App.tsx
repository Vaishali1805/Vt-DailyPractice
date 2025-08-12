import './App.css'
import { decrement, increment } from './redux/counterSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks'

function App() {
  const { value } = useAppSelector((state) => state.counterSlice);
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>Counter</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>+</button>
        <p>Count is {value}</p>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    </>
  )
}

export default App
