import { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

import * as Perlin from './PerlinFunctions';
import './App.css';

const { 
  setPlotData,
  perlinNoise,
} = Perlin;


function Canvas({ width, height }) {
    const canvasRef = useRef(null);

    const axes = setPlotData();

    const seed = 782940106259; //800123107341
    const size = 32;

    const colorValues = perlinNoise(seed, width, height, size);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);

      console.log(colorValues.length);
  
      for (let i = 0; i < imageData.data.length; i += 4) {
        /* imageData.data[i] = colorValues[i/4]*255;
        imageData.data[i + 1] = 0 + ((colorValues[i/4]*255)/2);
        imageData.data[i + 2] = colorValues[i/4]*255;
        imageData.data[i + 3] = 255; */

        if (colorValues[i/4] < 0.3) {
          imageData.data[i] = 70;
          imageData.data[i + 1] = 0;
          imageData.data[i + 2] = 70;
        } else if (colorValues[i/4] < 0.5 && colorValues[i/4] >= 0.3) {
          imageData.data[i] = 100;
          imageData.data[i + 1] = 0;
          imageData.data[i + 2] = 100;
        } else if (colorValues[i/4] >= 0.5 && colorValues[i/4] < 0.7) {
          imageData.data[i] = 190;
          imageData.data[i + 1] = 0;
          imageData.data[i + 2] = 190;
        } else if (colorValues[i/4] >= 0.7) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 0;
          imageData.data[i + 2] = 255;
        }


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
              y: colorValues,
              type: 'scatter',
              mode: 'lines',
              line: {color: 'green'},
              name: 'Noise values',
            },
          ]}
          layout={ {
            autosize: true, 
            title: 'Noise values',
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
