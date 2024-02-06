import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

let xRandomArr = [];
let randomArr = [];

let seed = 800123107341; //467853987599; //800123107341
let seedGrad = [];
let seedGrad1D = [];

let canvasSize = 640;
let recSize = 8;

let octavePointsArr = [];//.fill().map(() => Array(2));
let normalizedPoints = [[0, 0], [1, 0], [1, 1], [0, 1],];
let distanceVectors = [];
let pixelSize = 1/( (canvasSize/recSize)/8 );

let dotProduct = [];

let colorValues = [];

const handleColors = () => {
  console.log(`%c colors!:`, `color: pink`);
}

const distVectorLoop = () => {
  if (distanceVectors.length < 1) {
    for (let i = 0; i < 80; i += pixelSize*10) {
      for (let j = 0; j < 80; j += pixelSize*10) {
        calculateDistVec(Number((j/10).toFixed(1)), Number((i/10).toFixed(1)));
        //console.log(Number((j/10).toFixed(1)));
      }
    }
  }
  console.log(`distanceVectors: ${distanceVectors.length}`);
  console.log(distanceVectors);
}

//STEP.2: Calculate distance vectors for each pixels (4 vectors pointing to one pixel in one grid (2^nDim x onePixel x gridSize))
const calculateDistVec = (x, y) => {
  let topLeft = [Number(Math.abs(x - normalizedPoints[0][0]).toFixed(2)), Number(Math.abs(y - normalizedPoints[0][1]).toFixed(2))];
  let topRight = [Number(Math.abs(x - normalizedPoints[1][0]).toFixed(2)), Number(Math.abs(y - normalizedPoints[1][1]).toFixed(2))];
  let bottomRight = [Number(Math.abs(x - normalizedPoints[2][0]).toFixed(2)), Number(Math.abs(y - normalizedPoints[2][1]).toFixed(2))];
  let bottomLeft = [Number(Math.abs(x - normalizedPoints[3][0]).toFixed(2)), Number(Math.abs(y - normalizedPoints[3][1]).toFixed(2))];

  distanceVectors.push(topLeft);
  distanceVectors.push(topRight);
  distanceVectors.push(bottomRight);
  distanceVectors.push(bottomLeft);
}

distVectorLoop();


//STEP.3: Calculate dot product of earlier calculated gradient vectors and distance vectors (D1 = a1b1 + a2b2)
const calculateDotProduct = () => {
  if (dotProduct.length < (canvasSize * canvasSize)/recSize) {
    for (let i = 0; i < seedGrad.length; i++) {
      for (let j = 0; j < canvasSize/recSize; j++) {
        let dot = (distanceVectors[j][0] * seedGrad[i][0]) + (distanceVectors[j][1] * seedGrad[i][1]);
        dotProduct.push(dot);
      }
    }
  }

  console.log(distanceVectors[1][0]);
  console.log(seedGrad[0][0]);
  console.log((distanceVectors[1][0] * seedGrad[1][0]) + (distanceVectors[1][1] * seedGrad[1][1]));
  console.log(`%c . dotProduct: `, 'color: orange;');
  console.log(dotProduct);
}

//STEP.4: Interpolate dot products from the step.3
const interpolateDots = () => {
  let k = 0;
  for (let i = 0; i < dotProduct.length; i += 4) {
    let fracX = distanceVectors[k][0] - Math.floor(distanceVectors[k][0]);
    let fracY = distanceVectors[k][0] - Math.floor(distanceVectors[k][1]);

    let AB = dotProduct[i] + fracX * (dotProduct[i+1] - dotProduct[i]);
    let CD = dotProduct[i+3] + fracX * (dotProduct[i+2] - dotProduct[i+3]);
    let value = AB + fracY * (CD - AB);
    value = Math.abs((value - 0) / (5 - 0));
    colorValues.push(value);
    k++;

    //Number((pixelSize*10).toFixed(0))
  }
  console.log(`%c colorValues: `, `color: lightgreen`);
  console.log(colorValues);

  handleColors();
}




function Canvas() {

  const [canvasProp, setCanvasProp] = useState({
    width: canvasSize,
    height: canvasSize,
  });


  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < canvas.width/recSize; i++) {
      for (let j = 0; j < canvas.height/recSize; j++) {
        /* if (colorValues[j*(i+1)] >= 0.8) {
          ctx.fillStyle = 'rgb(220, 20, 20)';
        } else if (colorValues[j*(i+1)] < 0.8 && colorValues[j] >= 0.4) {
          ctx.fillStyle = 'rgb(120, 20, 20)';
        } else if (colorValues[j*(i+1)] < 0.4) {
          ctx.fillStyle = 'rgb(10, 20, 20)';
        } */

        ctx.fillStyle = `rgb(20, ${colorValues[j*(i+1)] * 255}, 20)`;
        ctx.fillRect(i*recSize, j*recSize, recSize, recSize);
      }
    }
    console.log(colorValues[canvasSize]);
  }, [handleColors]);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < canvas.width; i++) {
      for (let j = 0; j < canvas.height; j++) {
        xRandomArr.push(j);
        let randomFill = Math.max((Math.random()*255) - 50, 0);
        if (i == 0 && randomArr.length < canvasSize) randomArr.push(randomFill);
        /* ctx.fillStyle = `rgb(${randomFill}, 20, 20)`;
        ctx.fillRect(i*recSize, j*recSize, recSize, recSize); */
      }
    }
    //console.log(randomArr);

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
          //console.log(octavePointsArr);
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
  let b = seed/670; // multiplier for y
  let mod = 1000000000000; // modulo
  let gradVectorX = (a * seed + (inc - 1)) % (mod);
  let gradVectorY = (b * seed + (inc - 1)) % (mod);

  if (seedGrad.length < 1) {
    seedGrad.push([gradVectorX/mod, gradVectorY/mod]);
  }


  //STEP.1: Define random gradient vectors based on seed
  for (let i = inc; i < canvasSize; i++) {
    if (seedGrad.length < canvasSize/(pixelSize*10)) {
      gradVectorX = (a * gradVectorX + i) % (mod); //( ( (seed + i) * ( ( Math.sqrt(i ** i) ) + seed ) ) % 1000 );
      gradVectorY = (b * gradVectorX + i) % (mod);
      if (i == 1) {
        console.log(gradVectorX);
        console.log(gradVectorY);
      }
      seedGrad.push([gradVectorX/mod, gradVectorY/mod]);
      seedGrad1D.push(gradVectorX/mod);
    }
  }
  console.log(`seedGrad: `);
  console.log(seedGrad);
  console.log(seedGrad.length);


  calculateDotProduct();

  interpolateDots();

  return (
      <div className='app-container'>
        <div className='perlin-plot'>
          <Plot
            data={[
              {
                x: xRandomArr,
                y: seedGrad1D,
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
