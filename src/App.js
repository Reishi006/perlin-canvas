import { useRef } from 'react';
import Canvas from './Canvas';

import './App.css';


function App() {
  const inputRef = useRef(null);

  let width = 512;
  let height = width;

  const getValue = (e) => {
    e.preventDefault();
    if (!isNaN(e.target.value)) {
      inputRef.current = e.target.value; 
    } else {
      e.target.value = '';
    }
    console.log(e.target.value);
  }

  const generatePerlin = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
    }
  }

  return (
      <div className='app-container'>
        <div className='perlin'>
          <Canvas
            width={width}
            height={height}
          ></Canvas>
        </div>
        <label className='seed'>
          Input a seed (number between 100 000 - 999 999 999 999)<br/>
          <input 
            className='seed-input' 
            type='text' 
            min='100000' 
            max='999999999999' 
            maxLength='12' 
            placeholder='Enter a seed'
            onInput={(e) => getValue(e)}
            onKeyDown={(e) => generatePerlin(e)}
          ></input>
        </label>
      </div>
  );
}

export default App;
