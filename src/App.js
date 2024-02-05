import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

let xRandomArr = [];
let randomArr = [];

let seed = 800123107341; //467853987599; //800123107341
let seedGrad = [];

let canvasSize = 640;
let recSize = 8;

let octavePointsArr = [];//.fill().map(() => Array(2));

function Canvas() {

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
        xRandomArr.push(j);
        let randomFill = Math.max((Math.random()*255) - 50, 0);
        if (i == 0 && randomArr.length < canvasSize) randomArr.push(randomFill);
        ctx.fillStyle = `rgb(${randomFill}, 20, 20)`;
        ctx.fillRect(i*recSize, j*recSize, recSize, recSize);
      }
    }
    console.log(randomArr);

    for (let i = 0; i < canvasSize; i += canvasSize/8) {
      //console.log(`octavePointsArr ${octavePointsArr}`);
      if (i != 0) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }
    }

    for (let i = 0; i < canvasSize; i += canvasSize/8) {
      if (i != 0) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasSize, i);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }
    }


    for (let j = 0; j < canvasSize; j += canvasSize/8) {
      for (let i = 0; i < canvasSize; i += canvasSize/8) {
        if (i === 0 && octavePointsArr.length < 1) {
          console.log(octavePointsArr);
        }
  
        let topLeft = [i, j];
        let topRight = [i + canvasSize/8, j];
        let bottomRight = [i + canvasSize/8, j + canvasSize/8];
        let bottomLeft = [i, j + canvasSize/8];
  
        octavePointsArr.push(topLeft); //top-left
        octavePointsArr.push(topRight); //top-right
        octavePointsArr.push(bottomRight); //bottom-right
        octavePointsArr.push(bottomLeft); //bottom-left
  
        ctx.fillStyle = 'lightblue';
        ctx.beginPath();
        ctx.arc(topLeft[0], topLeft[1], 4, 0, 2 * Math.PI, true);
        ctx.fill();
  
        ctx.beginPath();
        ctx.arc(topRight[0], topRight[1], 4, 0, 2 * Math.PI, true);
        ctx.fill();
  
        ctx.beginPath();
        ctx.arc(bottomRight[0], bottomRight[1], 4, 0, 2 * Math.PI, true);
        ctx.fill();
  
        ctx.beginPath();
        ctx.arc(bottomLeft[0], bottomLeft[1], 4, 0, 2 * Math.PI, true);
        ctx.fill();
      }
    }

  }, []);

  return <canvas ref={canvasRef} width={canvasProp.width} height={canvasProp.height} className='perlin-canvas'></canvas>
}


function App() {
  let inc = 1;
  let a = seed/500; // multiplier (congruence)
  let gradVector = (a * seed + (inc - 1)) % (1000000000000);

  for (let i = inc; i < canvasSize; i++) {
    if (seedGrad.length < canvasSize/recSize) {
      gradVector = (a * gradVector + i) % (1000000000000); //( ( (seed + i) * ( ( Math.sqrt(i ** i) ) + seed ) ) % 1000 );
      if (i == 1) console.log(gradVector);
      seedGrad.push(gradVector/1000000000000);
    }
  }
  console.log(`seedGrad: ${seedGrad}`);

  return (
      <div className='app-container'>
        <div className='perlin-plot'>
          <Plot
            data={[
              {
                x: xRandomArr,
                y: seedGrad,
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
        <Canvas></Canvas>
      </div>
  );
}

export default App;
