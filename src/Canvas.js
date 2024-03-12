import { useEffect, useRef } from 'react';

import Plot from 'react-plotly.js';

import * as Perlin from './PerlinFunctions';

import './App.css';

const { setPlotData } = Perlin;


function Canvas({ width, height }) {
    const canvasRef = useRef(null);

    const axes = setPlotData();
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      let size = 8;
  
      for (let i = 0; i < canvas.width/size; i++) {
        for (let j = 0; j < canvas.width/size; j++) {
            let random = Math.floor(Math.random() * 255);
            //console.log(random);
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
              x: axes.xPlot,
              y: axes.yPlot,
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
