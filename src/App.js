import { useEffect, useRef, useState } from 'react';

import Canvas from './Canvas';

import './App.css';


function App() {

  let width = 640;
  let height = 640;

  return (
      <div className='app-container'>
        <Canvas
          width={width}
          height={height}
        ></Canvas>
      </div>
  );
}

export default App;
