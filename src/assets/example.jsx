import { useState, useEffect} from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {

  const [count, setCount] = useState(0)
  const [hasLiked, setHasLiked ] = useState(false);


  useEffect(() => {
    console.log(`${title} has been ${hasLiked?'liked':'unliked'}`);
     }, [hasLiked]);

  return(
    <div className='card' onClick={() => setCount(count + 1)}>
      <h2>{title}<br/> {count || null}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
    { hasLiked ? "💜":"🤍"} 
      </button>
    </div>
  )
}
const App = () => {

  return(
   <div className='card-container'>
    <h2>functional Arrow component</h2>
    <Card title ="star wars"/>
    <Card title ="squid game" />
    <Card title ="lion king"/>
    <Card title ="blacklist"/>

   </div>
  )
}

export default App
