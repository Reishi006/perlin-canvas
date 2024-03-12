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
      const imageData = ctx.createImageData(width, height);

      let size = 8;
  
      for (let i = 0; i < imageData.data.length; i += 4) {
        let random = Math.floor(Math.random() * 255);

        imageData.data[i] = 0;
        imageData.data[i + 1] = random;
        imageData.data[i + 2] = 0;
        imageData.data[i + 3] = 255;
      }

      console.log(imageData.data.length);

      ctx.putImageData(imageData, 0, 0)

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
            paper_bgcolor: "rgb(137, 192, 174)",
            plot_bgcolor: "rgb(137, 192, 174)",
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
