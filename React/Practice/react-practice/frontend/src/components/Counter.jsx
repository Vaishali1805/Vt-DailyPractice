import { useState,useRef } from 'react'
import Button from './button';

function Counter() {
  const [count, setCount] = useState(0);
  let intervalId = useRef(null);

  function startAction(myFunction,time){
    intervalId.current ??= setInterval(myFunction,time);
  }

  function stopAction() {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  function increment() {
    startAction(() => { setCount(count => count + 1) },100);
  }

  function decrement() {
    startAction(() => { setCount(count => count - 1) },100);
  }

  return (
    <>
      <Button value="increment" onMouseDown={increment} onMouseUp={stopAction} />
      <p>{count}</p>
      <Button value="decrement" onMouseDown={decrement} onMouseUp={stopAction} />
    </>
  )
}

export default Counter
