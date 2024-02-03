import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import './App.css';

let xRandomArr = [];
let randomArr = [];

function Canvas() {
  let canvasSize = 640;
  let recSize = 8;

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
  }, []);

  return <canvas ref={canvasRef} width={canvasProp.width} height={canvasProp.height} className='perlin-canvas'></canvas>
}


function App() {

  let seed = 72893747892;
  let seedArr = [];

  for (let i = 0; i < 255; i++) {
    if (seedArr.length < 255) seedArr.push(((seed*((Math.sqrt((i**15)))+1))%255).toFixed(0));
  }
  console.log(`seedArr: ${seedArr}`);

  return (
      <div className='app-container'>
        <div className='perlin-plot'>
          <Plot
            data={[
              {
                x: xRandomArr,
                y: seedArr,
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
