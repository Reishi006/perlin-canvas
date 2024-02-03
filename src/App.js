import { useEffect, useRef, useState } from 'react';
import './App.css';

function Canvas() {
  let canvasSize = 320;
  let recSize = 8;

  const [canvasProp, setCanvasProp] = useState({
    width: canvasSize,
    height: canvasSize,
  });


  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < canvas.width; i++) {
      for (let j = 0; j < canvas.height; j++) {
        ctx.fillStyle = `rgb(${(Math.random()*255) - 50}, 20, 20)`;
        ctx.fillRect(i*recSize, j*recSize, recSize, recSize);
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={canvasProp.width} height={canvasProp.height} className='perlin-canvas'></canvas>
}


function App() {

  return (
      <div className='app-container'>
        <Canvas></Canvas>
      </div>
  );
}

export default App;
