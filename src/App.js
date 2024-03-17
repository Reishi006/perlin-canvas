import Canvas from './Canvas';

import './App.css';


function App() {

  let width = 512;
  let height = width;

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
