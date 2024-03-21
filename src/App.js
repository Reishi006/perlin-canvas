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
      e.target.value = inputRef.current;
    }
    console.log(e.target.value);
  }

  const generatePerlinKey = (e) => {
    if (e.key === 'Enter' && inputRef.current.length > 5) {
      console.log('enter');
    }
  }

  const generatePerlinButton = () => {
    if (inputRef.current.length > 5) {
      console.log('button');
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
          <div>
            <input 
              className='seed-input' 
              type='text'
              min='100000' 
              max='999999999999'
              minLength='6'
              maxLength='12' 
              placeholder='Enter a seed'
              onInput={(e) => getValue(e)}
              onKeyDown={(e) => generatePerlinKey(e)}
            ></input>
            <button 
              className='seed-input-button'
              onClick={() => generatePerlinButton()}
            >Enter</button>
          </div>
        </label>
      </div>
  );
}

export default App;
