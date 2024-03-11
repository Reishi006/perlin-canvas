import { useEffect, useRef } from 'react';

import './App.css';

function Canvas(props) {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      
    }, []);
  
    return (
    <canvas 
        ref={canvasRef} 
        width={640} 
        height={640} 
        className='perlin-canvas'
    ></canvas>
    );
}

export default Canvas;