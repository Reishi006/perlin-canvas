import { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

import * as Perlin from './PerlinFunctions';
import './App.css';

const { 
  setPlotData,
  perlinNoise,
} = Perlin;


function Canvas(props) {
  const canvasRef = useRef(null);

  const axes = setPlotData(props.width);

  const seed = 800123107341; //800123107341 //782940106259
  
  const inputRef = useRef(Math.floor(Math.random()*99999999)+100000);
  const colorValues = useRef(100000);

  const [plotValues, setPlotValues] = useState(colorValues.current);

  const size = 128;

  colorValues.current = perlinNoise(inputRef.current, props.width, props.height, size);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    //ctx.clearRect(0, 0, props.width, props.height);
    const imageData = ctx.createImageData(props.width, props.height);
    console.log(imageData.data.length);

    console.log(colorValues.current.length);

    for (let i = 0; i < imageData.data.length; i += 4) {
      /* imageData.data[i] = props.colorValues[i/4]*255;
      imageData.data[i + 1] = 0 + ((props.colorValues[i/4]*255)/2);
      imageData.data[i + 2] = props.colorValues[i/4]*255;
      imageData.data[i + 3] = 255; */

      /* if (props.colorValues[i/4] < 0.3) {
        imageData.data[i] = 70;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 70;
      } else if (props.colorValues[i/4] < 0.5 && props.colorValues[i/4] >= 0.3) {
        imageData.data[i] = 100;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 100;
      } else if (props.colorValues[i/4] >= 0.5 && props.colorValues[i/4] < 0.7) {
        imageData.data[i] = 190;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 190;
      } else if (props.colorValues[i/4] >= 0.7) {
        imageData.data[i] = 255;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 255;
      } */

      if (colorValues.current[i/4] <= 0.35) {
        imageData.data[i] = 10;
        imageData.data[i + 1] = 10;
        imageData.data[i + 2] = 170;
      } else if (colorValues.current[i/4] > 0.35 && colorValues.current[i/4] <= 0.5) {
        imageData.data[i] = 10;
        imageData.data[i + 1] = 10;
        imageData.data[i + 2] = 230;
      } else if (colorValues.current[i/4] > 0.5 && colorValues.current[i/4] <= 0.55) {
        imageData.data[i] = 240;
        imageData.data[i + 1] = 230;
        imageData.data[i + 2] = 52;
      } else if (colorValues.current[i/4] >= 0.55 && colorValues.current[i/4] <= 0.75) {
        imageData.data[i] = 20;
        imageData.data[i + 1] = 180;
        imageData.data[i + 2] = 20;
      } else if (colorValues.current[i/4] > 0.75) {
        imageData.data[i] = 30;
        imageData.data[i + 1] = 210;
        imageData.data[i + 2] = 30;
      }

      imageData.data[i + 3] = 255;
    }

    console.log(imageData.data.length);
    console.log(colorValues.current);

    ctx.putImageData(imageData, 0, 0);

    setPlotValues(colorValues.current);

  }

    useEffect(() => {
      draw();
    }, []);

  const getValue = (e) => {
    e.preventDefault();
    if (!isNaN(e.target.value)) {
      inputRef.current = e.target.value; 
    } else {
      e.target.value = inputRef.current;
    }
    console.log(e.target.value);
  }

  const generatePerlinKey = (e) => {
    if (e.key === 'Enter' && inputRef.current.length > 5) {
      console.log('enter');
      let seed = Number(inputRef.current);
      colorValues.current = perlinNoise(seed, props.width, props.height, size);
      draw();
    }
  }

  const generatePerlinButton = () => {
    if (inputRef.current.length > 5) {
      console.log('button');
      let seed = Number(inputRef.current);
      console.log(seed);
      colorValues.current = perlinNoise(seed, props.width, props.height, size);
      draw();
    }
  }
  
    return (
    <>
      <div className='perlin'>
        <div className='perlin-plot'>
          <Plot
            data={[
              {
                x: axes.xPlot,
                y: plotValues,
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
            width={props.width} 
            height={props.height} 
            className='perlin-canvas'
        ></canvas>
      </div>
      <label className='seed'>
          Input a seed (number between 100 000 - 999 999 999 999)<br/>
          <div>
            <input 
              className='seed-input' 
              type='text'
              min='100000' 
              max='999999999999'
              minLength='6'
              maxLength='12' 
              placeholder='Enter a seed'
              onInput={(e) => getValue(e)}
              onKeyDown={(e) => generatePerlinKey(e)}
            ></input>
            <button 
              className='seed-input-button'
              onClick={() => generatePerlinButton()}
            >Enter</button>
          </div>
        </label>
    </>
    );
}

export default Canvas;
