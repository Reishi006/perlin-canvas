import Canvas from './Canvas';

import './App.css';


function App() {

  let width = 512;
  let height = width;

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
          <input className='seed-input' type='text' min='100000' max='999999999999' maxLength='12' placeholder='Enter a seed'></input>
        </label>
      </div>
  );
}

export default App;
