import { useEffect, useRef } from 'react';

import Plot from 'react-plotly.js';

import './App.css';

function Canvas({ width, height }) {
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
    <>
      <div className='perlin-plot'>
        <Plot
          data={[
            {
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              y: [2.5, 3.1, 4.0, 3.4, 4.2, 5.5, 4.9, 5.3, 5.0, 3.9],
              type: 'scatter',
              mode: 'lines',
              line: {color: 'green'},
              name: 'Plot',
            },
          ]}
          layout={ {
            autosize: true, 
            title: 'Plot',
            paper_bgcolor: "rgb(157, 192, 194)",
            plot_bgcolor: "rgb(157, 192, 194)",
          } }
          useResizeHandler={true}
        />
      </div>
      <canvas 
          ref={canvasRef} 
          width={width} 
          height={height} 
          className='perlin-canvas'
      ></canvas>
    </>
    );
}

export default Canvas;
