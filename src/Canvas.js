import { useEffect, useRef } from 'react';

import './App.css';

function Canvas({ width, height}) {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      let size = 8;
  
      for (let i = 0; i < canvas.width/size; i++) {
        for (let j = 0; j < canvas.width/size; j++) {
            let random = Math.floor(Math.random() * 255);
            console.log(random);
            ctx.fillStyle = `rgb(${random}, 0, 0)`;
            ctx.fillRect(i*size, j*size, size, size);
        }
      }

    }, []);
  
    return (
    <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className='perlin-canvas'
    ></canvas>
    );
}

export default Canvas;
