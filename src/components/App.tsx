import React from 'react';
import './App.css';
import sampleImage from './sample.jpg'

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">React Imager</header>

      <img src={sampleImage} alt='sample' style={{width: '50%'}}></img>

      <div className="btn-groups-manipulate">
        <button>Rotate Left</button>
        <button>Rotate Right</button>
        <button>Scale Up</button>
        <button>Scale Down</button>
      </div>

        <button>Finish</button>
    </div>
  );
};

export default App;
