import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

import Canvas from './Canvas';

import './App.css';


function App() {


  return (
      <div className='app-container'>
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
        <Canvas></Canvas>
      </div>
  );
}

export default App;
