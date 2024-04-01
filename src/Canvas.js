import { useState, useEffect, useRef} from 'react';
import Plot from 'react-plotly.js';

import * as Perlin from './PerlinFunctions';
import './App.css';

const { 
  setPlotData,
  perlinNoise,
} = Perlin;


function Canvas(props) {
  const canvasRef = useRef(null);
  const imageDataRef = useRef(null);
  const colorValuesRef = useRef(null);

  const axes = setPlotData(props.width);
  const axesColor = 'rgb(153, 201, 160)';
  const bgColor = 'rgb(43, 61, 50)';

  //const seed = 800123107341; //800123107341 //78294010625;

  const errorRef = useRef(null);
  const inputRef = useRef(null);

  const randomValue = Math.floor(Math.random()*999999999999)+100000;
  const [plotValues, setPlotValues] = useState(null);
  const [size, setSize] = useState(64);

  const [plotWidth, setPlotWidth] = useState(700);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, props.width, props.height);
    if (!imageDataRef.current) {
      imageDataRef.current = ctx.createImageData(props.width, props.height);
    }
    let imageData = imageDataRef.current;
    colorValuesRef.current = perlinNoise(inputRef.current.value, props.width, props.height, size);
    let colorValues = colorValuesRef.current;
    setPlotValues(colorValues);

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (colorValues[i/4] <= 0.15) {
        imageData.data[i] = 20;
        imageData.data[i + 1] = 20;
        imageData.data[i + 2] = 120;
      } else if (colorValues[i/4] > 0.15 && colorValues[i/4] <= 0.25) {
        imageData.data[i] = 10;
        imageData.data[i + 1] = 10;
        imageData.data[i + 2] = 170;
      } else if (colorValues[i/4] > 0.25 && colorValues[i/4] <= 0.4) {
        imageData.data[i] = 10;
        imageData.data[i + 1] = 10;
        imageData.data[i + 2] = 230;
      } else if (colorValues[i/4] > 0.4 && colorValues[i/4] <= 0.45) {
        imageData.data[i] = 240;
        imageData.data[i + 1] = 230;
        imageData.data[i + 2] = 52;
      } else if (colorValues[i/4] >= 0.45 && colorValues[i/4] <= 0.5) {
        imageData.data[i] = 30;
        imageData.data[i + 1] = 210;
        imageData.data[i + 2] = 30;
      } else if (colorValues[i/4] >= 0.5 && colorValues[i/4] <= 0.65) {
        imageData.data[i] = 20;
        imageData.data[i + 1] = 180;
        imageData.data[i + 2] = 20;
      } else if (colorValues[i/4] > 0.65 && colorValues[i/4] <= 0.8) {
        imageData.data[i] = 40;
        imageData.data[i + 1] = 150;
        imageData.data[i + 2] = 40;
      } else if (colorValues[i/4] > 0.8) {
        imageData.data[i] = 70;
        imageData.data[i + 1] = 120;
        imageData.data[i + 2] = 50;
      }

      imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    imageData = null;

    setPlotValues(colorValues);
    colorValues = null;

  }

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setPlotWidth(512);
    } else {
      setPlotWidth(700);
    }
  }

  useEffect(() => {
    inputRef.current.value = randomValue;
    draw();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    draw();
  }, [size]);

  const randomizeValue = () => {
    let random = Math.floor(Math.random()*999999999999)+100000;
    inputRef.current.value = random;
    draw();
  }

  const getValue = (e) => {
    e.preventDefault();
    if (!isNaN(e.target.value)) {
      inputRef.current.value = e.target.value;
    } else {
      e.target.value = inputRef.current.value;
    }
  }

  const generatePerlinKey = (e) => {
    if (e.key === 'Enter' && inputRef.current.value.length > 5 && !isNaN(inputRef.current.value)) {
      draw();
      errorRef.current.style.opacity = 0;
    } else if ((e.key === 'Enter' && inputRef.current.value.length <= 5) || isNaN(inputRef.current.value)) {
      errorRef.current.style.opacity = 1;
    }
  }

  const generatePerlinButton = () => {
    if (inputRef.current.value.length > 5 && !isNaN(inputRef.current.value)) {
      draw();
      errorRef.current.style.opacity = 0;
    } else if (inputRef.current.value.length <= 5 || isNaN(inputRef.current.value)) {
      errorRef.current.style.opacity = 1;
    }
  }

  const handleSize = (e) => {
    switch (e.target.value) {
      case '0':
        setSize(8);
        break;
      case '1':
        setSize(16);
        break;
      case '2':
        setSize(32);
        break;
      case '3':
        setSize(64);
        break;
      case '4':
        setSize(128);
        break;
      case '5':
        setSize(256);
        break;
      case '6':
        setSize(512);
        break;
      default:
        return;
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
                line: {
                  color: 'rgb(72, 240, 95)',
                  width: 4,
                },
                name: 'Noise values',
              },
            ]}
            layout={ {
              width: plotWidth,
              height: props.height,
              autosize: true, 
              title: 'Noise values',
              paper_bgcolor: bgColor,
              plot_bgcolor: bgColor,
              font: {
                color: axesColor,
              },
              xaxis: {
                tickcolor: axesColor,
                linecolor: axesColor,
              },
              yaxis: {
                tickcolor: axesColor,
                linecolor: axesColor,
              }
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
      <div className='seed'>
        Input a seed (number between 100 000 - 999 999 999 999)<br/>

        <div
          ref={errorRef}
          className='error'
        >
          Invalid input
        </div>

        <div>
          <button
            className='seed-input-button'
            onClick={() => randomizeValue()}
          >🔀</button>
          <input 
            ref={inputRef}
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

        <input
          className='seed-size'
          type='range'
          defaultValue={3}
          min='0'
          max='6'
          list='sizes'
          onChange={(e) => handleSize(e)}
        ></input>

        <label
          className='seed-size-label'
        >x{size/32}</label>
      </div>
    </>
    );
}

export default Canvas;
